<?php

/**==================================================================
 * CUSTOMISABLE OPTIONS
 * ==================================================================
 *
 * These are your customisable options for the script.
 * Most of these will either need to be changed, or altered depending
 * on your preference and server setup.
 *
 * See comments to right for explanations of options
 *
 */

// Form options
$options['captcha_secret']   = '6LcjxgkTAAAAAMI1HFvrwajJAi8R_WpV9v7hu_8x';                     // Google reCAPTCHA secret key
$options['redirect_url']     = '../email-success.html';                                     // URL of custom success page
$options['attachment_types'] = array( 'image/jpeg',                    // Array of mime-types to allow in uploads
                                      'image/gif',
                                      'image/png',
                                      'application/msword',
                                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                      'application/pdf',
                                      'application/zip'
                                    );

// Attachment management
$options['attachment_dir']   = 'attachments/';                         // Attachments upload directory
$options['attachment_limit'] = 10;                                     // 10mb is the considered "safe" size

// Generic email options
$options['from_address']     = 'info@seismicproductions.com';               // Address the email is sent from
$options['from_name']        = 'Seismic Productions';                              // Name to attach to the address
$options['to_addresses']     = array( 'info@seismicproductions.com' );               // To: addresse(s), add new array item for more
$options['bcc_addresses']    = array( 'robbie@rightforleft.com' );               // BCC: addresse(s), add new array item for more

// SMTP options
$options['use_smtp']         = false;                                  // Should the email be sent via SMTP, or default PHP mail server?
$options['smtp_host']        = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
$options['smtp_auth']        = true;                                   // Enable SMTP authentication
$options['smtp_username']    = 'username';                             // SMTP username
$options['smtp_password']    = 'password';                             // SMTP password
$options['smtp_secure']      = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
$options['smtp_port']        = 587;                                    // TCP port to connect to


// set for demo mode
$is_demo = false;


/**
 * Checks to see if your server supports CURL operations
 * @return bool yep/nope
 */
function curlEnabled(){
	if (function_exists('curl_version')){
		$content = curl_file_get_contents("http://google.com/");
		$enabled = ($content) ? true : false;
		return $enabled;
	} else {
		return false;
	}
}


/**
 * Gets file contents from a URL (alternative to file_get_contents)
 * @param  string $url url of the content to grab
 * @return string      content from the url
 */
function curl_file_get_contents($url)
{
	$curl = curl_init();
	$userAgent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)';

	curl_setopt($curl,CURLOPT_URL,$url);               //The URL to fetch. This can also be set when initializing a session with curl_init().
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,TRUE);    //TRUE to return the transfer as a string of the return value of curl_exec() instead of outputting it out directly.
	curl_setopt($curl,CURLOPT_CONNECTTIMEOUT,5);       //The number of seconds to wait while trying to connect.

	curl_setopt($curl, CURLOPT_USERAGENT, $userAgent); //The contents of the "User-Agent: " header to be used in a HTTP request.
	curl_setopt($curl, CURLOPT_FAILONERROR, TRUE);     //To fail silently if the HTTP code returned is greater than or equal to 400.
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, FALSE);  //To follow any "Location: " header that the server sends as part of the HTTP header.
	curl_setopt($curl, CURLOPT_AUTOREFERER, TRUE);     //To automatically set the Referer: field in requests where it follows a Location: redirect.
	curl_setopt($curl, CURLOPT_TIMEOUT, 10);           //The maximum number of seconds to allow cURL functions to execute.

	$contents = curl_exec($curl);
	curl_close($curl);
	return $contents;
}


/**
 * SETUP (ignore this part)
 * ==================================================================
 *
 */

// import and set up the mail instance
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;

// useful re-usable vars
$is_ajax = ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')) ? true : false;
$protocol = $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$translations_url = (curlEnabled()) ? $protocol.$_SERVER[HTTP_HOST].str_replace('process.php', 'translations.json', $_SERVER["REQUEST_URI"]) : 'translations.json';
$translations = (curlEnabled()) ? curl_file_get_contents($translations_url) : file_get_contents($translations_url);
$translations = json_decode($translations);
$lang = $translations->default_lang;

// check if data has actually been sent to the form
checkIfDataHasBeenSent();

// set up timezone and PHP "end of line";
$timezone = ini_get('date.timezone');
if(empty($timezone)){date_default_timezone_set('Europe/London');}
if(!defined("PHP_EOL")){define("PHP_EOL", "\r\n");}

// grab data from form
$fdata = sanitize_data($_POST);
$files = (isset($_FILES['attachment'])) ? $_FILES['attachment'] : null;


/**
 * VALIDATE FORM FIELD DATA
 * ==================================================================
 *
 * Add any custom validation you want for your form below.
 * Simply add a new "case" for each field in your form(s) for them
 * to be checked and validated against.
 *
 * e.g.
 * case 'field_name':
 *     if(empty($value)){ array_push($errors, 'Your message'); }
 *     break;
 *
 */
function getValidationErrors()
{
	global $translations, $lang, $fdata, $files, $options;

	// list of error messages to keep
	$errors = array();

	// loop through each of our form fields
	foreach ( $fdata as $field => $value ) {


		// Now switch functionality based on field name
		switch ($field) {

			// name
			case 'name':
				if( empty($value) ){
					array_push($errors, parseMessage($translations->form->error->required->$lang, array($field)));
				}
				break;

			// email
			case 'email':
				if ( empty($value) ) {
					array_push($errors, parseMessage($translations->form->error->required->$lang, array($field)));
				}
				elseif ( !filter_var($value, FILTER_VALIDATE_EMAIL) ) {
					array_push($errors, $translations->form->error->email->$lang);
				}
				break;

			// phone number
			case 'phone':
				if ( !empty($value) && !is_numeric($value) ){
					array_push($errors, parseMessage($translations->form->error->numeric->$lang, array($field)));
				}
				break;

			// message
			case 'message':
				if ( empty($value) ) {
					array_push($errors, parseMessage($translations->form->error->required->$lang, array($field)));
				}
				break;

			// message
			case 'honey':
				if ( !empty($value) ) {
					array_push($errors, $translations->form->error->honeypot->$lang);
				}
				break;

		}
	}

	// loop through any files and attempt to upload them
	// report any errors when files are uploaded
	if(!empty($files['name'][0])){
		$upload_errs = attachmentUploaded();
		if (!empty($upload_errs)) {
			for ($i=0; $i < count($upload_errs); $i++) {
				array_push($errors, $upload_errs[$i]);
			}
		}
	}

	// check if reCAPTCHA has been used
	if ( isset($_POST['g-recaptcha-response'])  ) {

		// grab the value
		$captcha = $_POST['g-recaptcha-response'];

		// if there's no value, tell the user it's not set
		if (!$captcha) {
			array_push($errors, $translations->form->error->captcha->empty->$lang);
		}

		// otherwise it is set, and we need to verify it
		else {
			$recaptcha = "https://www.google.com/recaptcha/api/siteverify?secret={$options['captcha_secret']}&response={$captcha}&remoteip={$_SERVER['REMOTE_ADDR']}";

			// get recaptcha
			$response = (curlEnabled()) ? curl_file_get_contents($recaptcha) : file_get_contents($recaptcha);
			$response = json_decode($response);

			// if the response comes back negative, it's a bot, error out
			if(!$response->success){
				removeUploadsFromServer();
				array_push($errors, parseMessage($translations->form->error->captcha->bot->$lang, $response->{'error-codes'}));
			}
		}
	}

	// spit the errors out for use
	return $errors;
}

/**
 * SANITIZE THE FORM DATA (prevents XSS)
 * ==================================================================
 *
 */
function sanitize_data($fdata)
{
	foreach ($fdata as $key => $value) {
		$data = $value;

		// Fix &entity\n;
		$data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
		$data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
		$data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
		$data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');

		// Remove any attribute starting with "on" or xmlns
		$data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);

		// Remove javascript: and vbscript: protocols
		$data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
		$data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
		$data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);

		// Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
		$data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
		$data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
		$data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);

		// Remove namespaced elements (we do not need them)
		$data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);

		// Remove really unwanted tags
		do{
			$old_data = $data;
			$data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
		} while ($old_data !== $data);

		// set the new cleaned out value
		$fdata[$key] = $data;
	}

	return $fdata;
}


/**
 * PARSE MESSAGES
 * ==================================================================
 *
 * This function takes a message string from the translations.json
 * file and inserts variables in the placeholders {$1}, {$2} etc.
 *
 */
function parseMessage($msg, $arr){

	// loop through the message, replace with vars
	for ($i=0; $i < count($arr); $i++) {
		$regx = "/{\\$".($i+1)."}/";
		$msg = preg_replace($regx, $arr[$i], $msg);
	}

	// kick out revised message
	return $msg;
}


/**
 * CHECK THE PAGE HAS DATA TO PROCESS
 * ==================================================================
 *
 * This function deals with a lack of data and the post_max_size PHP limit:
 * http://stackoverflow.com/questions/2133652/how-to-gracefully-handle-files-that-exceed-phps-post-max-size
 *
 */
function checkIfDataHasBeenSent()
{
	global $translations, $lang, $is_ajax;

	if (empty($_POST) && empty($_FILES)) {
		if ($is_ajax) {
			$error = array('errors' => array($translations->form->error->file->server_limit->$lang));
			echo json_encode($error);
		} else {
			echo '<h1>'.$translations->form->error->title->$lang.'</h1>';
			echo '<p>'.$translations->form->error->file->server_limit->$lang.'</p>';
		}
		exit;
	}
}


/**
 * Uploads the attachment provided in the form
 * ==================================================================
 *
 * This function is useful for validation of file uploads
 *
 */
function attachmentUploaded()
{
	global $translations, $lang, $fdata, $options, $files;

	// store any errors in here
	$errors = array();

	// store the total size of attachments
	$sizes = 0;

	// loop through files
	for ($i=0; $i < count($files['name']); $i++) {

		// check the file errors
		if ($files['error'][$i] !== 0) {
			array_push($errors, parseMessage($translations->form->error->file->general->$lang, array($files['name'][$i], $files['error'][$i])));
		}

		// and if the file is in our "allowed" list
		if( !in_array($files['type'][$i], $options['attachment_types']) ) {
			array_push($errors, parseMessage($translations->form->error->file->type->$lang, array($files['name'][$i])));
		}

		// attempt file upload, if fails, report it, otherwise return true
		$target_path = $options['attachment_dir'] . basename( $files['name'][$i] );
		if (!file_exists($target_path)) {
			if(!move_uploaded_file($files['tmp_name'][$i], $target_path)){
				array_push($errors, parseMessage($translations->form->error->file->failed->$lang, array($files['name'][$i])));
			}
		} else {
			array_push($errors, parseMessage($translations->form->error->file->exists->$lang, array($files['name'][$i])));
		}

		// up the "sizes" variable so we can check total filesize for attachments
		$sizes += $files['size'][$i];
	}

	// check final attachment size is less than our limit option
	$mb = 1048576; //bytes in a megabyte
	if ($sizes/$mb > $options['attachment_limit']) {
		array_push($errors, parseMessage($translations->form->error->file->size->$lang, array($options['attachment_limit'])));
	}

	// if there are errors, we'll need to remove ALL files
	if(!empty($errors)){
		removeUploadsFromServer();
	}

	return $errors;

}


/**
 * REMOVES FILES AFTER EMAIL IS SENT
 * ==================================================================
 *
 * This function will remove files from the $options['attachment_dir']
 * Once the processForm() function has finished running.
 *
 */
function removeUploadsFromServer()
{
	global $files, $options;

	// check we have files
	if(!empty($files['name'][0])){

		// loop through files
		for ($i=0; $i < count($files['name']); $i++) {

			// remove them
			unlink($options['attachment_dir'] . basename($files['name'][$i]));
		}
	}

}


/**
 * HTML EMAIL CONTENT
 * ==================================================================
 *
 */
function getHtmlEmailContent()
{
	global $translations, $lang, $options, $fdata;

	// define content
	$content  = '<p><strong>' . parseMessage($translations->email->intro->$lang, array($fdata['name'], $fdata['subject'])) . '</strong></p>';
	$content .= '<p>' . $fdata['message'] . '</p>';
	$content .= '<p>'.$translations->email->sign_off->$lang.'<br>';
	$content .= $fdata['name'] . '<br>';
	if (!empty($fdata['phone'])) { $content .= 'Tel: ' . $fdata['phone'] . '<br>'; }
	if (!empty($fdata['email'])) { $content .= 'Email: ' . $fdata['email']; }
	$content .= '</p>';

	// send it back
	return $content;
}


/**
 * PLAIN EMAIL CONTENT
 * ==================================================================
 *
 */
function getPlainEmailContent()
{
	global $translations, $lang, $options, $fdata;

	// define content
	$content  = parseMessage($translations->email->intro->$lang, array($fdata['name'], $fdata['subject'])) . PHP_EOL;
	$content .= $fdata['message'] . PHP_EOL;
	$content .= $translations->email->sign_off->$lang . PHP_EOL;
	$content .= $fdata['name'] . PHP_EOL;
	if (!empty($fdata['phone'])) { $content .= 'Tel: ' . $fdata['phone'] . PHP_EOL; }
	if (!empty($fdata['email'])) { $content .= 'Email: ' . $fdata['email']; }

	// send it back
	return $content;
}


/**
 * FUNCTION TO SEND THE EMAIL
 * ==================================================================
 *
 */
function sendEmailToSiteOwner()
{
	global $files, $options, $mail, $fdata, $translations, $lang, $is_ajax;

	// if we're using SMTP
	if ($options['use_smtp']) {
		$mail->isSMTP();
		$mail->Host       = $options['smtp_host'];
		$mail->SMTPAuth   = $options['smtp_auth'];
		$mail->Username   = $options['smtp_username'];
		$mail->Password   = $options['smtp_password'];
		$mail->SMTPSecure = $options['smtp_secure'];
		$mail->Port       = $options['smtp_port'];
	}

	// character encoding
	$mail->CharSet = 'UTF-8';

	// mail format
	$mail->isHTML         = true;

	// from
	$mail->From           = $options['from_address'];
	$mail->FromName       = $options['from_name'];

	// to
	foreach ($options['to_addresses'] as $address) {
		$mail->addAddress($address);
	}

	// bcc
	foreach ($options['bcc_addresses'] as $address) {
		$mail->addBCC($address);
	}

	// reply to
	$mail->addReplyTo($fdata['email']);

	// add files to the email
	if($files['name'][0] !== ''){
		for ($i=0; $i < count($files['name']); $i++) {

			// define file path
			$path = __DIR__.'/'.$options['attachment_dir'].$files['name'][$i];

			// add the attachment to the mail
			$mail->addAttachment($path);
		}
	}

	// set subject
	$mail->Subject = parseMessage($translations->email->subject->$lang, array($fdata['name'], $fdata['subject']));

	// set content
	$mail->Body    = getHtmlEmailContent();
	$mail->AltBody = getPlainEmailContent();

	// successfully sent email
	if ($mail->send()) {
		emailSuccessfullySent();
	}

	// error sending email
	else {
		if ($is_ajax) {
			echo json_encode(array('errors' => array(parseMessage($translations->email->error->$lang, array($mail->ErrorInfo)))));
		} else {
			echo parseMessage($translations->email->error->$lang, $mail->ErrorInfo);
		}
	}

	// remove uploaded files from the server
	removeUploadsFromServer();

}


/**
 * REPORTS ERRORS TO THE USER
 * ==================================================================
 *
 */
function reportErrors($errors)
{
	global $translations, $lang, $is_ajax;

	// for ajax responses, we send back the errors in a JSON object
	if ($is_ajax) {
		$errors = array('errors' => $errors);
		echo json_encode($errors);
	}

	// otherwise, we need to echo them out as HTML for the browser
	else {
		echo '<h2>'.$translations->form->error->title->$lang.'</h2>';
		echo '<ul>';
		foreach ($errors as $error) {
			echo '<li>'.$error.'</li>';
		}
		echo '</ul>';
		echo '<p>'.$translations->form->error->back_link->$lang.'</p>';
	}

	// if we have errors, we need to remove the files
	removeUploadsFromServer();
}


/**
 * SUCCESSFUL EMAIL, DO STUFF
 * ==================================================================
 *
 * This function performs the actions needed when the email is sent
 * successfully.
 *
 */
function emailSuccessfullySent()
{
	global $translations, $lang, $options, $fdata, $is_ajax;

	// redirect to custom "success" page if it's been set
	if ( !empty($options['redirect_url'])) {
		if (!$is_ajax) {
			header('Location: '.$options['redirect_url']);
		} else {
			echo json_encode(array('redirect' => array($options['redirect_url'])));
		}
		exit;
	}

	// if no redirect has been set, echo out the success message
	if ($is_ajax) {
		echo json_encode(array('success' => array($translations->form->success->title->$lang)));
	} else {
		echo '<h2>'.$translations->form->success->title->$lang.'</h2>';
	}

	removeUploadsFromServer();
}


/**
 * PROCESS THE FORM
 * ==================================================================
 *
 * This function runs through the process of:
 * - validating the form
 * - sending data they supplied to you via email
 * - giving the user feedback when the email is sent
 *
 */
function processForm()
{
	global $is_demo, $translations, $lang, $fdata, $options;

	// create an attachments directory if it doesn't exist
	$dir = $options['attachment_dir'];
	if (!file_exists($dir) && !is_dir($dir)) {mkdir($dir, 0777, true);}

	// Validate the form data, grab any errors
	// If errors exist, stop processing and tell the user
	$errors = getValidationErrors();
	if( !empty($errors) ){
		reportErrors($errors);
		exit;
	}

	// Send the data to each email address in the options
	if (!$is_demo) {
		sendEmailToSiteOwner();
	} else {
		emailSuccessfullySent();
	}

} processForm();

?>