(function($) {

	'use strict';

	$(document).on('click', '#bbp_okler_add_signature', function(){
		if( $(this).is(':checked') ) {
			$('#bbp_okler_add_signature_content').removeClass('d-none');
		} else {
			$('#bbp_okler_add_signature_content').addClass('d-none');
		}
	});

	$(document).on('click', '.okler-bbp-actions-resolved.enabled', function(e){
		e.preventDefault();

		var $this = $(this), 
			user_type = $(this).data('user-type'),
			topic_id  = $(this).data('topic-id'),
			nonce     = $(this).data('nonce');

		$this.addClass('active');

		$.ajax({
			url: okler.ajaxurl,
			type: 'post',
			data: {
				action: 'okler_bbp_ajax_mark_as_resolved',
				user_type: user_type,
				topic_id: topic_id,
				nonce: nonce
			},
		})
		.done(function() {
			$this.tooltip('dispose');
			
			if( $this.data('type') == 'not-resolved' ) {
				$this
					.removeClass('custom-btn-style-2')
					.addClass('custom-btn-style-1')
					.html('MARK AS RESOLVED');

				$this.attr('data-type', 'resolved').data('type', 'resolved');

				$this.closest('.bbp-topic-title').find('.resolved-icon').remove();
			} else {
				
				if( $this.data('user-type') == 'admin' ) {
					$this
						.removeClass('custom-btn-style-1')
						.addClass('custom-btn-style-2')
						.html('MARK AS NOT RESOLVED');

					$this.attr('data-type', 'not-resolved').data('type', 'not-resolved');
				}

				$this.closest('.bbp-topic-title').prepend('<span class="dashicons dashicons-yes resolved-icon" style="color: green;"></span>');
			}

			if( $this.data('user-type') == 'user' ) {
				$this.remove();
			}

			$this.removeClass('active');

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	/*
	* Open a Ticket - Purchase Field
	*/
	var $purchaseField = $('#bbp_topic_custom_purchase_code');
	
	var checkPurchase = function() {

		if($purchaseField.val() == '') {
			return;
		}
		
		setTimeout(function() {
			
			$('#new-post-loading').show();
			$('#new-post-extra-fields').hide();
			$('#new-post-invalid-code').hide();
			$('#new-post-expired').hide();
			$('.subject-row').hide();
		
			$.ajax({
				type: 'GET',
				url: '/purchase-confirm.php',
				data: {
					k: $purchaseField.val()
				}
			}).always(function(data, textStatus, jqXHR) {
		
				if (data.response == 'success') {
					$('#new-post-loading').hide();
					$('#new-post-extra-fields').show();
					$('#new-post-invalid-code').hide();
					$('#new-post-expired').hide();
				} else if (data.response == 'error' && data.errorCode == 2) {
					$('#new-post-loading').hide();
					$('#new-post-extra-fields').hide();
					$('#new-post-invalid-code').hide();
					$('#new-post-expired').show();
					$('#new-post-renew-button').attr('href', data.renewURL);
				} else {
					$('#new-post-loading').hide();
					$('#new-post-extra-fields').hide();
					$('#new-post-invalid-code').show();
					$('#new-post-expired').hide();
				}

			});
			
		}, 300);
	
	};
	
	if($('#new-post').get(0)) {

		$('#new-post').validate({});
	
		$('#new-post-check-purchase-code-button').on('click', function() {
			checkPurchase();
		});
		
		$purchaseField.on('keypress', function (e) {
			if (e.which == 13) {
				checkPurchase();
				return false;
			}
		});
	
		$(document).ready(function() {
			checkPurchase();
		});

		$('#bbp_forum_id').on('change', function() {
			if( $(this).val() ) {
				$('.subject-row').show();

				// Auto Complete
				if( typeof $('#bbp_topic_title').data('ui-autocomplete') == 'undefined' ) {
					$('#bbp_topic_title').autocomplete({
						source: function(request, resolve) {
							$.ajax({
								url: okler.ajaxurl,
								type: 'post',
								data: {
									action: 'okler_bbp_ajax_topics_autocomplete',
									nonce: $('#okler_nonce').val(),
									term: request.term,
									forum_id: $('#bbp_forum_id').val()
								},
								complete: function(data) {
									var response = JSON.parse( data.responseText );

									if( response.status == 'success' ) {
										resolve( response.results );
									}
								}
							});					        
					    },
						delay: 500,
						minLength: 3,
						select: function( event, ui ) { 
				            window.open( ui.item.value );
				            setTimeout(function(){
								$( event.target ).val('');
				            }, 1000);
				        }
					});
				}

				setTimeout(function(){
					$('#bbp_topic_title').trigger('blur');
					$('#bbp_topic_title').trigger('change');
					$('#bbp_topic_title').trigger('keydown');
				}, 500);
			} else {
				$('.subject-row').hide();
			}
		});
	
	}

}).apply(this, [jQuery]);