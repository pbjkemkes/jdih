<!DOCTYPE html>

<html>
<head>

<meta charset="UTF-8">
<title>Masuk - JDIH Biro PBJ</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="icon" type="image/png" href="favicon.png">

<link rel="stylesheet"
href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>

<style>
body{
  background:#f4f6f9;
}

.container-login{
  max-width:400px;
  margin:80px auto;
}

.card{
  background:white;
  padding:30px;
  border-radius:10px;
  box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.header-title{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:25px;
  justify-content:center;
}

.header-title img{
  height:40px;
}

.header-title h3{
  margin:0;
  font-weight:600;
  color:#2c3e50;
}

.btn-login{
  width:100%;
  background:#2c3e50;
  color:white;
  border:none;
}

.btn-login:hover{
  background:#1a252f;
}
</style>

</head>

<body>

<div class="container-login">

  <div class="card">

```
<div class="header-title">
  <img src="logo.png">
  <h3>JDIH Biro PBJ</h3>
</div>

<?php if(isset($_GET['error'])){ ?>
  <div class="alert alert-danger">
    Username / Password salah
  </div>
<?php } ?>
    
<form action="proses_login.php" method="POST">

  <div class="form-group">
    <label>Username</label>
    <input type="text" name="username"
    class="form-control" required>
  </div>

  <div class="form-group">
    <label>Password</label>
    <input type="password" name="password"
    class="form-control" required>
  </div>

  <button type="submit"
  class="btn btn-login">
  Login
  </button>

</form>
```

  </div>

</div>

</body>
</html>
