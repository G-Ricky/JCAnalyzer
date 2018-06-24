define(["Lexer", "Common", "C"], function(Lexer, Common, C) {
	var _lexer;
	var _grammar;
	var _syntax_tree;
	function Parser(grammar, lexer) {
		_grammar = Common.clone(grammar);
		_lexer = lexer;
	}
	
	Parser.prototype.parse = function() {
		var lexer = _lexer;
		lexer.reset();
		var token = _get_next_token();
		var node_id = 0;
		var root = {
			"id": node_id++,
			"name": _grammar.start.name,
			"symbol": _grammar.start,
			"nodes": []
		}
		var node = {
			"id": node_id++,
			"name": _grammar.end.name,
			"symbol": _grammar.end,
			"nodes": [
				node
			]
		};
		var stack = [node, root];
		do {
			_debug(stack);
			node = stack.pop();
			if(node.name === "EMPTY") {
				continue;
			}
			if(node.symbol.is_term) {
				if(!_terminalMatch(node.symbol.type, token.type)) {
					_error();
				}else if(_terminalMatch(node.symbol.type, token.type)) {
					node.content = token.content;
					if(lexer.eof()) {
						token = {
							"id": 0,
							"type": _grammar.end.type,
							"content": "",
							"name": "empty"
						};
					}else{
						token = _get_next_token();
					}
				}
			}else{
				var p = this.getProduction(node.symbol.type, token.type);
				if(p/* && p.left === node.name*/) {
					for(var i = p.right.length - 1;i >= 0;--i) {
						var new_node = {
							"id": node_id++,
							"name": p.right[i].name,
							"symbol": p.right[i],
							"nodes": []
						};
						//output += "\"" + node.id + " " + node.symbol.description + "\" -> \"" + new_node.id + " " + new_node.symbol.description + "\" [label=\"\"];" + "\n";
						node.nodes.push(new_node);
						stack.push(new_node);
					}
				}else{
					_error();
				}
			}
			//console.log(JSON.stringify(stack));
		}while(node.name !== _grammar.end.name);
		//console.log(output);
		_syntax_tree = root;
		return;
	}
	
	function _debug(stack)  {
		var out = "";
		for(var i = 0;i < stack.length;++i) {
			out += stack[i].name + " ";
		}
		console.log(out);
		return;
	}
	
	Parser.prototype.getSyntaxTree = function() {
		return Common.clone(_syntax_tree);
	}
	
	Parser.prototype.getProduction = function(nonterminal_id, terminal_id) {
		var nonterminal, terminal;
		var nonterminals = _grammar.nonterminals,
		    terminals = _grammar.terminals;
		for(var i = 0;i < nonterminals.length;++i) {
			if(nonterminals[i].type === nonterminal_id) {
				nonterminal = nonterminals[i];
				break;
			}
		}
		if(!nonterminal) {
			return null;
		}
		for(var i = 0;i < terminals.length;++i) {
			if(terminals[i].type === terminal_id) {
				terminal = terminals[i];
				break;
			}
		}
		if(!terminal) {
			return null;
		}
		if(!_grammar.table[nonterminal.name]) {
			return null;
		}
		return _grammar.table[nonterminal.name][terminal.name];
	}
	
	function _terminalMatch(token_id, symbol_id) {
		return token_id === symbol_id
	}
	
	function _get_next_token() {
		var token;
		do{
			token = _lexer.getNextToken();
		}while(!_lexer.eof() && token.type === C.LEXER.SPACE);
		return token;
	}
	
	return Parser;
});