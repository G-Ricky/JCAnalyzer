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
			//_debug(stack);
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
							//"content": ,
							"nodes": []
						};
						//output += "\"" + node.id + " " + node.symbol.description + "\" -> \"" + new_node.id + " " + new_node.symbol.description + "\" [label=\"\"];" + "\n";
						node.nodes.push(new_node);
						stack.push(new_node);
					}
				}else{
					_error("Expected " + node.name + "," + token.name + " given");
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
	
	function _error(msg) {
		msg = msg || "";
		throw new Error("Syntax error: " + msg);
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
		token = _convert_token(token);
		return token;
	}
	
	function _convert_token(token) {
		token = Common.clone(token);
		switch(token.type) {
			case C.LEXER.IDENTIFIER:
				return _convert_identifier(token);
			case C.LEXER.DECIMAL:
			case C.LEXER.OCTAL:
			case C.LEXER.HEXADECIMAL:
				token.type = C.PARSER.INTEGER;
				return token;
			default:
				return token;
		}
	}
	
	function _convert_identifier(token) {
		token = Common.clone(token);
		switch(token.content) {
		case "auto":
			token.type = C.PARSER.KW_AUTO;
			return token;
		case "break":
			token.type = C.PARSER.KW_BREAK;
			return token;
		case "case":
			token.type = C.PARSER.KW_CASE;
			return token;
		case "char":
			token.type = C.PARSER.KW_CHAR;
			return token;
		case "const":
			token.type = C.PARSER.KW_CONST;
			return token;
		case "continue":
			token.type = C.PARSER.KW_CONTINUE;
			return token;
		case "default":
			token.type = C.PARSER.KW_DEFAULT;
			return token;
		case "do":
			token.type = C.PARSER.KW_DO;
			return token;
		case "double":
			token.type = C.PARSER.KW_DOUBLE;
			return token;
		case "else":
			token.type = C.PARSER.KW_ELSE;
			return token;
		case "enum":
			token.type = C.PARSER.KW_ENUM;
			return token;
		case "extern":
			token.type = C.PARSER.KW_EXTERN;
			return token;
		case "float":
			token.type = C.PARSER.KW_FLOAT;
			return token;
		case "for":
			token.type = C.PARSER.KW_FOR;
			return token;
		case "goto":
			token.type = C.PARSER.KW_GOTO;
			return token;
		case "if":
			token.type = C.PARSER.KW_IF;
			return token;
		case "int":
			token.type = C.PARSER.KW_INT;
			return token;
		case "long":
			token.type = C.PARSER.KW_LONG;
			return token;
		case "register":
			token.type = C.PARSER.KW_REGISTER;
			return token;
		case "return":
			token.type = C.PARSER.KW_RETURN;
			return token;
		case "short":
			token.type = C.PARSER.KW_SHORT;
			return token;
		case "signed":
			token.type = C.PARSER.KW_SIGNED;
			return token;
		case "sizeof":
			token.type = C.PARSER.KW_SIZEOF;
			return token;
		case "static":
			token.type = C.PARSER.KW_STATIC;
			return token;
		case "struct":
			token.type = C.PARSER.KW_STRUCT;
			return token;
		case "switch":
			token.type = C.PARSER.KW_SWITCH;
			return token;
		case "typedef":
			token.type = C.PARSER.KW_TYPEDEF;
			return token;
		case "union":
			token.type = C.PARSER.KW_UNION;
			return token;
		case "unsigned":
			token.type = C.PARSER.KW_UNSIGNED;
			return token;
		case "void":
			token.type = C.PARSER.KW_VOID;
			return token;
		case "volatile":
			token.type = C.PARSER.KW_VOLATILE;
			return token;
		case "while":
			token.type = C.PARSER.KW_WHILE;
			return token;
		default:
			return token;
		}
	}
	
	return Parser;
});