<?php
if(isset($_POST['submit'])) {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Create email body
    $email_body = "Name: $name\nEmail: $email\nMessage:\n$message";
    
    // Send email
    $to = 'mohanr2883@gmail.com'; // Change this to your email address
    $subject = 'New Contact Form Submission';
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if(mail($to, $subject, $email_body, $headers)) {
        echo '<div class="alert alert-success">Your message has been sent successfully.</div>';
    } else {
        echo '<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again later.</div>';
    }
} else {
    // If form is not submitted, redirect back to the form page
    header("Location: index.html");
    exit;
}
?>
