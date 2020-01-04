<!DOCTYPE html>
<html>
    <head> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
       <link rel="stylesheet" href="./css/main.css">
       <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
    </head>
    <body>
    <header>
      <div class="top-main">
        <div class="top-texts">
            <span>Selected Value : </span>
            <input id="alpha" class="alpha insideContent" type="text" maxlength="1">
              <span> - </span>
            <input id="number" class="num insideContent" type="number">
        </div>
        <div class="top-colors">
            <span>Color : </span>
            <div class="colordiv white" data-color='#fff'></div>
            <div class="colordiv red" data-color='#f55'></div>
            <div class="colordiv green" data-color='#18cc30' ></div>
        </div>
        <div class="top-confirm">
          <!--button>Confirm</button-->
          <a href="#" id="delete_selected">
            <span class="glyphicon glyphicon-trash"></span>
          </a>
        </div>
      </div> 
    </header>
    <div class="container-x">
      <aside class="user-dashboard">
        <nav class="main">
            <!--h5>Menu</h5-->
            <ul class="nav-container">
              <li class="nav-item open">
                  <span class="ship
                  ">Ship_name</span>
                  <?php
                      require 'function.php';
                      echo '<ul class="listing subnav">';
                      get_can();
                      echo '</ul>';
                  ?>
              </li>
            </ul>
        </nav>

        <div class="side-controls">
          <div class='add-controls'>
            <button id="planning" class='drop-ready' data-color='#fff'>Add Planning</button>
            <input type="text" id="planseries" class="seriesValues" value="<?php echo (getMaxSeries('plan_series'))+1;?>">
          </div>
          <div class="add-controls">
            <button id="hazmat" class='drop-ready' data-color='#f55'>Add Hazmat</button>
            <input type="text" id="hazmatseries"  class="seriesValues" value="<?php echo (getMaxSeries('hazmat_series'))+1;?>">
          </div>
          <div class="save-controls">
            <button class="button" id="save_can">Save</button>
            <button class="button" id="save_can2">Save and Exit</button>
          </div>
          
          </div>
      </aside>

      <main class="main">
        <canvas id="c" class="explore_area" width="600" height="400"  data-originalWidth="600" data-originalHeight="400"></canvas>
        <a class="zbtn zoom"><i class="fas fa-search-plus"></i></a>
        <a class="zbtn zoom-out"><i class="fas fa-search-minus"></i></a>
        <a class="zbtn zoom-init"><i class="fas fa-recycle"></i></a>
        
      </main>
    </div>    
        
<!--
        <div style="display: inline-block; margin-left: 10px">
            <button id="drawing-mode" class="btn btn-info">Cancel drawing mode</button><br>
            <button id="clear-canvas" class="btn btn-info">Clear</button><br>
            https://jsfiddle.net/Fidel90/7kmf3jz2/
            http://jsfiddle.net/xhtv2ewd/
            http://jsfiddle.net/xhtv2ewd/1/
            http://jsfiddle.net/xhtv2ewd/2/
            <div id="drawing-mode-options">
              <label for="drawing-mode-selector">Mode:</label>
              <select id="drawing-mode-selector">
                <option>Pencil</option>
                <option>Circle</option>
                <option>Spray</option>
                <option>Pattern</option>
          
                <option>hline</option>
                <option>vline</option>
                <option>square</option>
                <option>diamond</option>
                <option>texture</option>
              </select><br>
          
              <label for="drawing-line-width">Line width:</label>
              <span class="info">24</span><input type="range" value="30" min="0" max="150" id="drawing-line-width"><br>
          
              <label for="drawing-color">Line color:</label>
              <input type="color" value="#005E7A" id="drawing-color"><br>
          
              <label for="drawing-shadow-color">Shadow color:</label>
              <input type="color" value="#005E7A" id="drawing-shadow-color"><br>
          
              <label for="drawing-shadow-width">Shadow width:</label>
              <span class="info">22</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-width"><br>
          
              <label for="drawing-shadow-offset">Shadow offset:</label>
              <span class="info">14</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-offset"><br>
            </div>
          </div>

-->
        
        
  <script src="./js/jquery.js"></script>
  <script src="./js/fabric.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="./js/main.js"></script>
    </body>
</html>

