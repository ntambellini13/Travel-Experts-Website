<!-- Authors: Nicolas Tambellini
Date: July 31,2019
Version: 2.5
Functionality: Adds new agent to DB -->

<?php

// Checks to see if submit was clicked and an image was selected for upload
if(isset($_POST['submit']) && isset($_FILES['Image'])){

    $dbUser = 'dbAdmin';
    $dbPass = 'L0g1n2db!';

    // Ensure that the user can only submit if they have logged in to access this page
    if(!isset($_SESSION['login_user'])){
        echo "<p>You do not have access. Please go to the login page.</p>";
        exit(); // Gets rid of submit and reset buttons.
    }

    include("functions.php");

    // Grabs agent data to array and takes out 'submit' key
    $agentData = $_POST;
    unset($agentData["submit"]);

    // Put image file path in agent data and move from temp folder to cards folder
    $name = basename($_FILES["Image"]["name"]);
    $agentData['Image'] = "images/cards/$name";
    move_uploaded_file($_FILES['Image']['tmp_name'],$agentData['Image']);
    
    // Allows us to pass null value for middle initial if left blank
    if($agentData['AgtMiddleInitial']==''){
        unset($agentData['AgtMiddleInitial']);
    }

    // Encrypts password
    $agentData['Password'] = password_hash($agentData['Password'],PASSWORD_DEFAULT);
    
    // Insert into agents table
    try{
        $success = insertData($agentData,'agents', 'travelexperts',$dbUser,$dbPass);
        // Outputs success message to user
        if($success){
            echo "<p>Successfully inserted new agent into the database.</p>";
        }
        else{
            echo "<p>Failed to insert new agent into the database.</p>";
        }
         // Try to write to log
        try{   
            $logFile = fopen("logs/agentRegisterLog.txt","a");
            if(!$logFile){
                throw new Exception("Can't write to agent register log: ");
            }
            if($success){
                fwrite($logFile,"Successfully inserted new agent into the database.\n");
            }
            else{
                fwrite($logFile,"Failed to insert new agent into the database.\n");
            }
            fclose($logFile);
        }
        catch(Exception $e){
            // Try to write to super log if write to agent register log fails
            $log = fopen("logs/superErrorLog.txt","a");
            fwrite($log,$e->getMessage());
            fwrite($log,"Agent Register Log: ");
            if($success){
                fwrite($log,"Successfully inserted new agent into the database.\n");
            }
            else{
                fwrite($log,"Failed to insert new agent into the database.\n");
            }
            fclose($log);
        }
    }
    catch(Exception $e){
        echo "<p>Failed to insert new agent into the database.</p>";
    }
    
}
?>