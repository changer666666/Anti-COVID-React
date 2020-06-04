<?php

	require __DIR__.'/vendor/autoload.php';
	use Kreait\Firebase\Factory;
	$factory = (new Factory())->withDatabaseUri('https://anticovid-a242d.firebaseio.com');
	$database = $factory->createDatabase();

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, POST, GET, DELETE, PATCH, OPTIONS");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);

	// $doctorName = "";
	// $doctorInfo = "";

	if ($_POST){
		// $doctorName = $_POST["doctorName"];
		// $doctorInfo = $_POST["doctorInfo"];

		//dequeue current patient
		//invoke database, delete the earliest patient.

		//1. query values in waiting list, ordered by timestamp.
		//get the earlist patient in waiting list.
		$earlySnapshot = $database->getReference('/Waiting List')->orderByChild('Timestamp')->limitToFirst(1)->getSnapshot();
		$earlyValue = $earlySnapshot->getValue();

		// echo ("<pre>");
		// echo "earlyPatient";
		// print_r($earlyValue);
		// echo ("</pre>");

		//2. set curPatient to be next petient
		$curPatientRef = $database->getReference('/curPatient');
		// echo ("<pre>");
		// print_r($curPatientRef->getSnapshot()->getValue());
		// echo ("</pre>");
		foreach ($earlyValue as $key => $patient){
	    	$curPatientEmail = "{$patient['email']}";
	    	$curPatientName = $key;
		}
		$curPatientRef->set($curPatientEmail);

		//3. set isAvailable to be true. Android will detect this field change.
		$database->getReference('/isAvailable')->set("True");

		//4.  delete ealiest patient in waiting list.
		foreach ($earlyValue as $key => $person){
	    	$number = $key;
	    	// echo "$number";
			$database->getReference('/Waiting List/'.$number)->set([]);
		}

		// set response code - 200 OK

		http_response_code(200);

		// $subject = $_POST['fname'];
		// $to = "changer666666@gmail.com";
		// $from = $_POST['email'];

		// // data

		// $msg = $_POST['message'];

		// Headers

		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";
		// $headers.= "From: <" . $from . ">";
		// mail($to, $subject, $msg, $headers);

		// echo json_encode( $_POST );
		header('Content-type: application/json');
		echo json_encode(array(
			"sent" => true,
			"curPatientEmail" => $curPatientEmail,
			"curPatientName" => $curPatientName,

		));
	}
	// else{

	// 	// tell the user about error

	// 	echojson_encode(["sent" => false, "message" => "Something went wrong"]);
	// }

?>