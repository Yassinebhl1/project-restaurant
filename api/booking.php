<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['message' => 'Use the reservation form to send a booking request.']);
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!is_array($payload)) {
    respond(400, ['message' => 'Please submit a valid reservation request.']);
}

foreach (['name', 'email', 'phone', 'date', 'hour', 'messages'] as $field) {
    if (isset($payload[$field]) && !is_string($payload[$field])) {
        respond(422, ['message' => 'Please check your reservation details.']);
    }
}

$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$phone = trim((string) ($payload['phone'] ?? ''));
$date = trim((string) ($payload['date'] ?? ''));
$hour = trim((string) ($payload['hour'] ?? ''));
$people = filter_var($payload['people'] ?? null, FILTER_VALIDATE_INT);
$message = trim((string) ($payload['messages'] ?? ''));
$parsedDate = DateTimeImmutable::createFromFormat('!Y-m-d', $date);
$validDate = $parsedDate !== false
    && $parsedDate->format('Y-m-d') === $date
    && $date >= date('Y-m-d');
$validTime = preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', $hour) === 1;

if ($name === '' || strlen($name) > 100
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false || strlen($email) > 254
    || $phone === '' || strlen($phone) > 30
    || !$validDate || !$validTime
    || $people === false || $people < 1 || $people > 20
    || strlen($message) > 1000) {
    respond(422, ['message' => 'Please check your details. Choose a future date and a party size between 1 and 20.']);
}

try {
    require __DIR__ . '/../DB/config.php';
    $statement = $con->prepare(
        'INSERT INTO booking (name, email, phone, `time`, `hours`, people, messages) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $statement->bind_param('sssssis', $name, $email, $phone, $date, $hour, $people, $message);
    $statement->execute();
    $statement->close();
    $con->close();
} catch (Throwable $exception) {
    error_log('Booking submission failed: ' . $exception->getMessage());
    respond(500, ['message' => 'We could not save your request. Please try again later or call us directly.']);
}

respond(201, ['message' => "Thanks, {$name}! Your reservation request has been received."]);
