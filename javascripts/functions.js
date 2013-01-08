$(document).ready(function() {

  $("#submit").click(function(event) {
		event.preventDefault();
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();
		$.ajax({
			type: "post",
			url: "/contact",
			data: { email: email, message: message },
			success: function() {
				$("form").slideUp();
				$(".result").html("<p>Bedankt voor je bericht. Ik neem snel contact met je op!</p>");
				$(".result").fadeIn();
			},
			error: function() {
				$(".result").html("<p>Er is iets misgegaan! Kun je mij een <a href='mailto:stef@baardbaard.nl'>mailtje</a> sturen en mij gelijk even laten weten dat er iets mis is met het formulier? Bedankt!</p>");
				$(".result").fadeIn();
			}
		});
	});
});
