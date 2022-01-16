<?php include_once 'header.php'?>
<body>
    <div class="wrapper">
        <section class="form login">
            <header>Chat Application</header>
            <form action="#">
                <div class="error-txt"></div>
                <div class="field input">
                    <label>Email Address</label>
                    <input name="email" type="email" placeholder="Enter your email">
                </div>
                <div class="field input">
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Enter your password">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="field button">
                    <input type="submit" value="Start chat">
                </div>
            </form>
            <div class="link">Not yet signed? <a href="index.php">Signup now</a></div>
        </section>
    </div>
    <script src="js/pass-show-hide.js"></script>    
    <script src="js/login.js"></script>    
</body>
</html>