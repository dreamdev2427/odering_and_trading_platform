var SummernoteBasicData = {
    placeholder: '',
    height: 160,
    dialogsInBody: true,
    tabsize: 2,
    fontNames: ['Arial', 'Arial Black', 'Tahoma', 'Comic Sans MS', 'Courier New', 'Noto Sans', 'Noto Serif'],
    fontSizes: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '30', '34', '36', '38', '40', '42', '44', '46', '48'],
    toolbar: [
            ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['fontname', ['fontname']],
            ['table', ['table']],
            ['insert', ['link', 'video', 'picture']],
            ['view', [ 'codeview', 'help']]
    ]
};
var SummernoteMinimumData = {
    placeholder: '',
    height: 160,
    dialogsInBody: true,
    tabsize: 2,
    fontNames: ['Arial', 'Arial Black', 'Tahoma', 'Comic Sans MS', 'Courier New', 'Noto Sans', 'Noto Serif'],
    fontSizes: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '30', '34', '36', '38', '40', '42', '44', '46', '48'],
    toolbar: [
            ['style', ['bold', 'italic', 'underline']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['fontname', ['fontname']]
    ]
};

//SummernoteBasicDataInitialize('emailText', 'Enter Email Text', 300);
function SummernoteBasicDataInitialize(id, txt, size) {
    SummernoteBasicData.placeholder = txt;
    SummernoteBasicData.height = size;
    $('#' + id).summernote(SummernoteBasicData);

    //remove the picture embeddig section so that embedded pictures cananot go in the text. only allow images with URL
    var imageUploadDiv = $('div.note-group-select-from-files');
    if (imageUploadDiv.length) {
      imageUploadDiv.remove();
    }
}
function SummernoteMiniDataInitialize(id, txt, size) {
    SummernoteBasicData.placeholder = txt;
    SummernoteBasicData.height = size;
    $('#' + id).summernote(SummernoteMinimumData);
}


function commonGetQueryStringValue(name) {
	/*const url = document.URL;
	query_string = url.split("?");
	string_values = query_string[1].split("&");
	for (i = 0; i < string_values.length; i++) {
		if (string_values[i].match(key)) { req_value = string_values[i].split("="); }
	}
	return req_value[1];*/

    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function commonGetMySQLDateFormat(str) {

	var parseDate = Date.parse(  str  );

	if( isNaN(parseDate) )	{
		 return "1970-1-1";
	} else {
		//TODO    return empty string if date is not correct format
		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var res = str.split(" ");

		if(  res[1]  == "undefined" )
			res[1] = "1";
		if(  res[2]  == "undefined" )
			res[2] = "1970";

		return res[2] + "-" + (monthNames.indexOf(res[0]) + 1)  + "-" + res[1];
	}

}

function checkemailformat(mail)  {
    //var re = /\S+@\S+/;
    //return re.test(mail);


     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,100})+$/.test(mail))
        return true;

    //alert("You have entered an invalid email address!")
    return false;

}

// Allow only numbers in the textbox
// Example     <INPUT id="txtChar" onkeypress="return allowOnlyNumberInTextBoxes(event)" type="text" name="txtChar">
function allowOnlyNumberInTextBoxes(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function commonChangeFileNamesOnKYCScreens() {

        $( ".ClassFileName" ).each(function( index ) {

              var fileName = $( this ).text().substring(  0, $( this ).text().lastIndexOf(".")  )
              if(fileName.length > 37 ) {
                  var uuid =  fileName.substring(fileName.length - 36, fileName.length);
                  var z = uuid.split("-")
                  if(  z[0].length == 8 && z[1].length == 4 && z[2].length == 4  && z[3].length == 4  && z[4].length == 12 )
                  {
                       fileName = fileName.substring( 0, fileName.length - 37 )  +  $( this ).text().substring( $( this ).text().lastIndexOf("."), $( this ).text().length  )
                  } else {
                       fileName =  $(this).text()
                  }
              } else
                      fileName =  $(this).text()

               $(this).text(fileName)
        });
}


function isEthereumBasedProtocolID(id) {
    // 1 = R-Token
    // 2 = PolyMath
    // 3 = Ravencoin
    // 4 = ERC1404 Ethereum
    // 5 = ERC1404 Polygon
    return [1, 2, 4, 5, 6].includes(id);
}



function checkEthereumAddressIsValid(address) {
   return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(     address     ));
}
