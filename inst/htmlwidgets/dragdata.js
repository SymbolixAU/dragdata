HTMLWidgets.widget({

  name: 'dragdata',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(e) {

			var datasets = {};
			var dragOver = function(e) {
				e.preventDefault();
			};
			var dropData = function(e) {
				e.preventDefault();
				handleDrop(e.dataTransfer.files);
			};

			var handleDrop = function(files) {

				for (var i = 0, f; f = files[i]; i++) {

						// check for file size before uploading
					if (f.size > 70 ){

						alert("data too big yo");

					} else {

						var reader = new FileReader();

						reader.onload = (function(file) {

							return function(e) {

								datasets[file.name.toLowerCase()] = e.target.result;
								Shiny.onInputChange("dragged_data", datasets);

								var div = document.createElement("div");
								var src = "https://cdn0.iconfinder.com/data/icons/office/512/e42-512.png";
								div.id = "datasets";

								div.innerHTML = [
									"<img class='thumb' src='", src, "' title='", encodeURI(file.name),
									"'/>", "<br>", file.name, "<br>"].join('');
								document.getElementById("drop-area").appendChild(div);
							};

						})(f);

						reader.readAsText(f);
					}
				}
			};

        // TODO: code to render the widget, e.g.
        //el.innerText = e.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
