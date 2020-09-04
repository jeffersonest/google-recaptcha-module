			/** Starts the reecaptcha's libs on page
			* 
			* Don't forget a valid site key.
			* You can generates as valid site_key on: @see https://www.google.com/recaptcha/admin/create
			*
			* @description Initialize the recaptcha libs on page
			* @param {string} site_key Valid site key generated on google
			* Use the method recaptchaInit into the onLoad:
			* @example
			* Use into your onload function:
			*
			* liveloUtils.recaptchaInit().then(function () {
			*	var element = document.getElementsByClassName(
			*		"custom-parity-banner-recaptcha"
			*	);
			* 	liveloUtils
			*	.recaptchaRender(widget.recaptcha_key(), element[0], function (recaptcha_callback) {
			*		//TODO: RECAPTCHA TOKEN VALIDATION HERE!!!
			*		console.log('TOKEN', recaptcha_callback);
			*	})
			*	.then(function (element_id) {
			*		widget.recaptcha_element_id = element_id; //Create a global var into your widget to be used to save the google recaptcha elementID and calls the execute()
			*	})
			*	.catch(function (error) {});
			* });
			*
			*/

			recaptchaInit: function (site_key) {
				return new Promise(function (resolve, reject){
					var script= document.createElement('script');
					script.type='text/javascript';
					script.src='https://www.google.com/recaptcha/api.js?render=explicit';   
					console.log('TCL: jeff: script.src', script.src)
					script.async = true;
					script.defer = true;
					script.onload = resolve;
					script.onerror = reject;
					document.head.appendChild(script);
				})
			},

			/** Recaptcha Render
			* 
			* @description Render the recaptcha challenge on page
			* @param {string} site_key Valid site key generated on google
			* @param {string} element ID of element or HtmlElement to execute the render function
			* @param {Function} callback_recaptcha Callback of recaptcha render execution
			* renderedElement {string} 
			*/

			recaptchaRender: function (site_key, element, callback_recaptcha) {
				return new Promise(function(resolve, reject) {
					grecaptcha.ready(function() {
						console.log('recaptchaRender site_key', site_key)
						var renderedElement = grecaptcha.render(element, {
							'sitekey' : site_key,
							'callback' : callback_recaptcha,
							'error-callback' : reject,
							'expired-callback': reject,
							'tabindex': 4,
							'size': 'invisible',
							'isolated': true
						});     						
						resolve(renderedElement);
					});	
				});
			},

			/**
			 * @description Execute the recaptcha challenge. Show the challenge deppends of Google
			 * @param {string} recaptcha_element_id ElementID generated with the render execution
			 */
			recaptchaExecute: function (recaptcha_element_id) {
				grecaptcha.ready(function() {
					grecaptcha.execute(recaptcha_element_id);
				});	
			}
