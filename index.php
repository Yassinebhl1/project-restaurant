<?php
$builtApp = __DIR__ . '/dist/index.html';

if (!is_file($builtApp)) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'The app has not been built yet. Run npm run build and try again.';
    exit;
}

readfile($builtApp);
