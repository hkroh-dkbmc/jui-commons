define([
		'routers/Router'
		],
		function( Router ) {

			describe('Router Router', function () {

				it('should be an instance of Router Router', function () {
					var router = new Router();
					expect( router ).to.be.an.instanceof( Router );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});
