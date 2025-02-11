<?php

include 'db/config.php';

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

if (isset($_POST['submit'])) {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];  
    $hour = $_POST['hour'];  
    $people = $_POST['people'];
    $message = $_POST['messages']; 

    // Insert data into database
    $sql = "INSERT INTO booking (name, email, phone, time, hours, people, messages)
            VALUES ('$name', '$email', '$phone', '$date', '$hour', '$people', '$message')";

    if ($con->query($sql) === TRUE) {
      
      echo "<script>alert('Booking Successful!');</script>";
      
    } else {
        echo "Error: " . $sql . "<br>" . $con->error;
    }

    // Close connection
    $con->close();
}
?>


<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Exo+2:ital,wght@0,500;1,500&family=Montserrat:ital,wght@0,701;1,701&family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <title>Document</title>
</head>
<body>
  <header id="home">
    <h1 id="logo"><span>Golden</span> Table</h1>
    <nav>
      <ul>
        
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#menu">Menu</a>
        <a href="#chef">chefs</a>
      </ul>
      <div class="btn">
      <a href="#booking">Book a Table</a>
    </div>
    </nav>
  </header>
  <main>
    <section id="home" class="home">
      <div class="part1">
        <h1>Enjoy Your <br> Healthy <br>
          Delicious Food</h1>
        <p>Enjoy healthy, delicious food made with fresh ingredients</p>
        <a class="btn2" href="">Book a Table</a>
        <a class="video" id="watchVideo"><i class="fa-solid fa-video"></i>Watch Video</a>  
      </div>
      <div id="videoContainer" class="hidden">
        <video controls>
          <source src="/video/Timeline 1.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
        <img src="img/everything/plate.png" alt="">
      
    </section>

    <section id="about" class="about">
      <p id="head">ABOUT US</p>
      <h1>LEARN MORE <span> ABOUT US</span></h1>
      <img id="img1" src="img/everything/about.jpg" alt="">
      <div class="number">
        <h2>Book a Table <br><span>+212 6009765998</span></h2>
      </div>
      
      <div class="part2">
        <p id="p1">Lorem ipsum dolor sit amet, consectetur <br>adipiscing elit, sed do eiusmod tempor <br>incididunt ut labore et dolore magna aliqua.</p>
        <br>
        <p><i class="fa-solid fa-circle-check"></i>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><br>
        <p><i class="fa-solid fa-circle-check"></i>Duis aute irure dolor in reprehenderit in voluptate velit.</p><br>
        <p><i class="fa-solid fa-circle-check"></i>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis <br>aute irure dolor in reprehenderit in voluptate trideta <br>storacalaperda mastiro dolore eu fugiat nulla pariatur.</p>
        <br>
        <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis <br>aute irure dolor in reprehenderit in voluptate trideta <br>storacalaperda mastiro dolore eu fugiat nulla pariatur.</p>
        <img id="img2" src="img/everything/about-2.jpg" alt="">
      </div>

    </section>

    <section class="menu" id="menu">
      <div class="menu-text">
        <p>OUR MENU</p>
        <h1>CHECK SOME OF <span>OUR MENU</span></h1>
      </div>
    <div class="parent">
        <div class="plate-1">
        <img src="img/plates-img/sushi.png" alt="">
        <p>Sushi</p>
        <h3>$10.60</h3>
      </div>
      <div class="plate-1">
        <img src="img/plates-img/chicken.png" alt="">
        <p>chicken</p>
        <h3>$10.60</h3>
      </div>
      <div class="plate-1">
        <img src="img/plates-img/fich.png" alt="">
        <p>fish</p>
        <h3>$10.60</h3>
      </div>
      <div class="plate-1">
        <img src="img/plates-img/dumblings.png" alt="">
        <p>Dumblings</p>
        <h3>$10.60</h3>
      </div>
      <div class="plate-1">
        <img src="img/plates-img/macaroni.png" alt="">
        <p>Macaroni</p>
        <h3>$10.60</h3>
      </div>
      <div class="plate-1">
        <img src="img/plate.png" alt="">
        <p>Steak</p>
        <h3>$10.60</h3>
      </div>
    </div>
      
    </section>
    <section id="chef" class="chef">
      <p>OUR CHEF</p>
      <h1>MEET <span>OUR CHEFS</span></h1>
      <div class="chef-info">
        <div class="chef-card">
          <img src="img/everything/chef 1.png" alt="Chef 1">
          <h3>Chef One</h3>
          <p>With over 20 years of experience, Chef One is passionate about creating innovative dishes that leave a lasting impression.</p>
        </div>
        <div class="chef-card">
          <img src="img/everything/chef 1.png" alt="Chef 2">
          <h3>Chef Two</h3>
          <p>Chef Two specializes in unique flavor combinations and modern culinary techniques.</p>
        </div>
        <div class="chef-card">
          <img src="img/everything/chef 1.png" alt="Chef 3">
          <h3>Chef Three</h3>
          <p>Chef Three brings an artistic touch to traditional dishes with a focus on presentation.</p>
        </div>
      </div>
    </section>

    <section id="booking" class="booking-section">
      <div class="booking-container">
          <div class="image-container">
              <img src="img/everything/table.jpeg" alt="Restaurant" class="booking-image">
          </div>
          <div class="form-container">
              <h1>Book a Table</h1>
              <form action="index.php" method="POST" class="booking-form">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your Name" required>
  
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your Email" required>
  
                  <label for="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required>
  
                  <label for="date">Date</label>
                  <input type="date" id="date" name="date" required>
  
                  <label for="hour">Hour</label>
                  <input type="time" id="hour" name="hour" required>
  
                  <label for="people">Number of People</label>
                  <input type="number" id="people" name="people" min="1" max="20" required>
  
                  <label for="message">Message</label>
                  <textarea id="message" name="messages" rows="4" placeholder="Any special requests?" required></textarea>
  
                  <button type="submit" name="submit" class="submit-btn">Submit</button>
              </form>
          </div>
      </div>
  </section>
  
    
    
  <footer class="footer">
    <div class="footer-container">
        <div class="footer-info">
            <p>&copy; 2025 Golden Table . All Rights Reserved.</p>
        </div>
        <div class="footer-links">
            <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
        <div class="footer-social">
            <a href="#" class="social-icon"><img src="icons/facebook" alt="Facebook"></a>
            <a href="#" class="social-icon"><img src="icons/twitter" alt="Twitter"></a>
            <a href="#" class="social-icon"><img src="icons/insta" alt="Instagram"></a>
        </div>
    </div>
</footer>

  
  </main>
  <script src="script.js"></script>
  
</body>
</html>