<html>
<head>
    <title>Register</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/main.css">
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <div class="well bs-component">
        <table class="table table-striped table-hover ">
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Country</th>
            <th>Registration Date</th>
            </tr>
        </thead>
        <tbody>
        <?php
            foreach ($users as $user) {
                echo "
                    <tr>
                        <td>{$user['first_name']}</td>
                        <td>{$user['last_name']}</td>
                        <td>{$user['address1']}</td>
                        <td>{$user['address2']}</td>
                        <td>{$user['city']}</td>
                        <td>{$user['state']}</td>
                        <td>{$user['zip']}</td>
                        <td>{$user['country']}</td>
                        <td>{$user['created_at']}</td>
                    </tr>
                ";
            }
        ?>
        </tbody>
        </table>
      </div>
      <a href="/" class="btn btn-primary">Register New User</a>
      </div>
    </div>
  </div>

  <script src="/javascripts/jquery.min.js"></script>
  <script src="/javascripts/register-submit.js"></script>
</body>
</html>
