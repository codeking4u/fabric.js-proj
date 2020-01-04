<?php
require './includes/db.php';
if(isset($_REQUEST['action']) && function_exists($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
  call_user_func($action);
}
function save_can(){
    global $link;
    $mysata = $_POST['myData']; 
    $id = $_POST['id']; 
    if($id){
        $sql = "UPDATE can_backup SET canvasjson = '$mysata' WHERE ID = '$id'";
		$result = mysqli_query($link, $sql);
    }else{
        $sql = "insert into can_backup (imageid, canvasjson, extra) values('asd','".$mysata."','asds')";
        $result = mysqli_query($link, $sql);
        $id = mysql_insert_id();
    }    
}
function get_can(){
    global $link;
    //echo 'sda';exit;
    $cans_query = 'select canvasjson,ID from can_backup';
    $result = mysqli_query($link, $cans_query);
    $i=1;
    $add ="";
    while($row = $result->fetch_assoc()){
          ;
          
        $add.= "<li class='datajson' data-json='".$row['canvasjson']."'data-id='".$row['ID']."'><img src='https://homepages.cae.wisc.edu/~ece533/images/mountain.png' alt='plan' style='width: 25px;
        height: 25px;
        padding: 0;
        margin-right: 10px;'><span>Plan ".$i."</span></li>";
        $i++;
    }
    $add.= "<li class='datajson' data-id='".$row['ID']."' data-url='https://dummyimage.com/600x400/000/fff'><img src='https://dummyimage.com/600x400/000/fff' alt='plan' style='width: 25px;
        height: 25px;
        padding: 0;
        margin-right: 10px;'><span>600x400</span></li>";

    $add.= "<li class='datajson' data-id='".$row['ID']."' data-url='https://dummyimage.com/1200x400/000/fff'><img src='https://dummyimage.com/1200x400/000/fff' alt='plan' style='width: 25px;
        height: 25px;
        padding: 0;
        margin-right: 10px;'><span>1200x400</span></li>";
    $add.= "<li class='datajson' data-id='".$row['ID']."' data-url='https://dummyimage.com/400x1200/000/fff'><img src='https://dummyimage.com/400x1200/000/fff' alt='plan' style='width: 25px;
        height: 25px;
        padding: 0;
        margin-right: 10px;'><span>400x1200</span></li>";
    $add.= "<li class='datajson' data-id='".$row['ID']."' data-url='https://dummyimage.com/400x1500/000/fff'><img src='https://dummyimage.com/400x1500/000/fff' alt='plan' style='width: 25px;
        height: 25px;
        padding: 0;
        margin-right: 10px;'><span>400x1200</span></li>";
    echo $add;
}

function getMaxSeries($table){
    global $link;
    if(isset($_REQUEST['table'])){
        $table = $_REQUEST['table'];
    }
    $sql = "SELECT MAX(series) AS maxseries FROM $table";
    $result = mysqli_query($link,$sql);
    $value = mysqli_fetch_object($result);
    if(is_null($value->maxseries) || empty($value->maxseries)){
        $num = '0';
    }else{
        $num =  $value->maxseries;
    }
    if(is_ajax()){
        echo $num;
    }else{
        return $num;
    }
    exit;
}
function addNewNumber(){
    global $link;
    if($_POST['type']=="plan_series"){
        $table = "plan_series";
    }
    if($_POST['type']=="hazmat_series"){
        $table = "hazmat_series";
    }
    $num = $_POST['number'];
    if($table){
        $sql = "INSERT INTO $table ( `series`) VALUES ($num)";
        $result = mysqli_query($link, $sql);
        echo getMaxSeries($table);
    }
    
    exit;
}

function is_ajax(){
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']);
  }

?>