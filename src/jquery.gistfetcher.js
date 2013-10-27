;(function($) {

	var _write = document.write;
	var _numGistsToFetch = 0;
	var _numGistsFetched = 0;
	var _gistsResult = {};
	var _gistsQueue = [];
	var _gistStyleTag = "";
	var _hasAddedStyleTag = false;

	var init = function(options) {
		var defaultOptions = {
			gistId: 0,
			baseUrl: 'https://gist.github.com/'
		}

		if(options && typeof options == 'object') {
			options = $.extend(defaultOptions, options);
		}

		return options;
	};

	var prepareFetch = function(options, $el) {
		_gistsResult[_numGistsToFetch++] = [];
		_gistsQueue.push({
			gistId: options.gistId,
			element: $el
		});
	};

	var replaceDocumentWrite = function() {
		document.write = function(str) {
			_gistsResult[_numGistsFetched].push(str);
		};
	};

	var hasFetchedAllGists = function() {
		return _numGistsFetched === _numGistsToFetch;
	};

	var fetchGist = function(options) {
		var gistId = options.gistId;
		var baseUrl = options.baseUrl;
		console.log(baseUrl);
		var embedUrl = baseUrl + gistId + '.js';
		$.ajax({
			url: embedUrl,
			dataType: 'script',
			cache: true,
			success: hasFetchedGistCallback
		});
	};

	var hasFetchedGistCallback = function() {
		_numGistsFetched++;
		if(hasFetchedAllGists()) {
			document.write = _write;
		}

		for(var i=0; i < _gistsQueue.length; ++i) {
			var $el = _gistsQueue[i].element;
			var gistId = _gistsQueue[i].gistId;
			for(var j=0; j<_numGistsFetched; ++j) {
				var gistHtml = _gistsResult[j][1];
				_gistStyleTag = _gistsResult[j][0];

				if(gistHtml.match('"gist' + gistId + '"')) {
					var $gistEl = $("<code />");
					$gistEl.html(gistHtml);
					$gistEl.insertAfter($el);
					$el.remove();
				}
			}
		}

		if(_hasAddedStyleTag === false && _gistStyleTag !== '') {
			$('head').append(_gistStyleTag);
			_hasAddedStyleTag = true;
		}
	};

	$.fn.gistFetcher = function(options) {
		options = init(options);
		var $el = $(this[0]);
		prepareFetch(options, $el);
		replaceDocumentWrite();
		fetchGist(options);
	};

})(jQuery);
