<?php
    // NOTE: You better harden this in your design
    
    $action=$_GET['id'];
    if ( $action == "poweroff" )
    {
        // chmod u+s /sbin/poweroff
        $output = shell_exec('/opt/edgemap/scripts/poweroff.sh 2>&1');
        echo "Executing poweroff: ".$output;
    }
    if ( $action == "distress" )
    {
        echo "Executing distress";
    }
    if ( $action == "wipe" )
    {
        echo "Executing wipe";
    }

?>
