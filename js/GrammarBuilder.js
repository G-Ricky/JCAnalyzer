define("GrammarBuilder", ["Common"], function(Common) {
	var _start;
	var _end;
	var _empty;
	var _symbols;
	var _nonterminals;
	var _terminals;
	var _productions;
	
	var _terminal_id;
	var _nonterminal_id;

	
	function GrammarBuilder(text) {
		_from_text(text);
	}
	
	GrammarBuilder.prototype.getGrammar = function() {
		var obj = {
			"start": _start,
			"end": _end,
			"empty": _empty,
			"symbols": _symbols,
			"nonterminals": _nonterminals,
			"terminals": _terminals,
			"productions": _productions
		}
		var new_obj = Common.clone(obj);
		return new_obj;
	}
	
	//GrammarBuilder.prototype.removeLeftRecursive() { }
	
	//GrammarBuilder.prototype.fetchCommonFactor() { }
	
	function _from_text(text) {
		var lines = text.split("\n");
		_init();
		_from_array(lines);
	}
	
	function _from_array(lines) {
		var symbols = _get_default_symbols(), symbol;
		var vocabularies;
		var productions = [], production;
		var start, end = "EOF", empty = "EMPTY";
		
		for(var i = 0;i < lines.length;++i) {
			lines[i] = lines[i].trim();
			vocabularies = lines[i].split(/\s+/);
			vocabularies[1] = vocabularies[1] || "";
			if(vocabularies[1] === "->") { //get productions
				production = _get_production(vocabularies, symbols);
				productions.push(production);
			}else if(vocabularies[0] === "NONTERMINAL" || vocabularies[0] === "TERMINAL") { //get define
				symbol = _get_define(vocabularies);
				if(!_definination_conflict(symbols, symbol)) {
					symbols[symbol.name] = symbol;
				}
			}else if(vocabularies[0] === "START") {
				start = vocabularies[1];
			}else 
			/*	
			if(vocabularies[0] === "END") {
				end = vocabularies[1];
			}else if(vocabularies[0] === "EMPTY") {
				empty = vocabularies[1];
			}else */
				if(lines[i].length === 0){//empty line
				continue;
			}else{
				_warning("'" + lines[i] + "' is not a definition or a production");
			}
		}	
		
		
		//get nonterminals and terminals
		var nonterminals = [], terminals = [];
		for(var name in symbols) {
			if(name === "EMPTY") {
				continue;
			}
			if(symbols[name].is_term) {
				terminals.push(symbols[name].name);
			}else{
				nonterminals.push(symbols[name].name);
			}
		}
		
		_start = start;
		_end = end;
		_empty = empty;
		_symbols = symbols;
		_nonterminals = nonterminals;
		_terminals = terminals;
		_productions = productions;
		return;
	}
	
	function _init() {
		_terminal_id = 0;
		_nonterminal_id = 0;
		_start = "START";
		_end = "EOF";
		_empty = "EMPTY";
		_symbols = {};
		_nonterminals = [];
		_terminals = [];
		_productions = [];
	}
	
	function _get_default_symbols() {
		return {
			"EOF": {
				"id": 0,
				"name": "EOF",
				"is_term": true,
				"description": "end"
			},
			"EMPTY": {
				"id": 1,
				"name": "EMPTY",
				"is_term": true,
				"description": "empty"
			}
		};
	}
	
	function _get_production(vocabularies, symbols) {
		var left = vocabularies[0];
		var right = vocabularies.slice(2);
		_symbol_check_defined(symbols, left);
		for(var i = 0;i < right.length;++i) {
			_symbol_check_defined(symbols, right[i]);
		}
		return {
			"left": left,
			"right": right
		};
	}
	
	function _get_define(v) {
		var is_term = false;
		var name = "";
		var id = -1;
		var description = "";

		switch(v.length) {
		case 4:
			description = _definination_description(v[3]);
		case 3:
			id = _definination_id(v[2]);
		case 2:
			name = _definination_name(v[1]);
			is_term = _definination_is_term(v[0]);
			break;
		default:
			_error("Invaild param");
		}
		return {
			"id": id,
			"name": name,
			"is_term": is_term,
			"description": description
		};
	}
	
	function _symbol_check_defined(symbols, name) {
		if(symbols[name]) {
			return;
		}
		_error("Symbol '" + name + "' is not defined");
	}

	
	function _definination_conflict(symbols, symbol) {
		if(symbols[symbol.name]) {
			_warning("Symbol name conflict");
			return true;
		}
		for(var name in symbols) {
			if(symbol.id === symbols[name].id) {
				_warning("Symbol id conflict");
				return true;
			}
		}
		return false;
	}
	
	function _definination_description(v3) {
		return v3.trim();
	}
	
	function _definination_id(v2) {
		return parseInt(v2);
	}
	
	function _definination_name(v1) {
		return v1.trim();
	}
	
	function _definination_is_term(v0) {
		if(v0 === "NONTERMINAL") {
			return false;
		}else if(v0 === "TERMINAL") {
			return true;
		}else{
			_error("Unknow symbol type");
		}
	}
	
	function _get_all_symbols(productions) {
		for(var i = 0;i < productions.length;++i) {
			
		}
	}
	
	function _error(msg) {
		msg = msg || "";
		throw new Error("Input error: " + msg);
	}
	
	function _warning(msg) {
		msg = msg || "";
		console.warn("Input warning: " + msg);
	}
	
	return GrammarBuilder;
});