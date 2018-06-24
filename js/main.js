/*
require(["Test"], function(LL) {
	var l = new LL(["E", "E'", "T", "T'", "F"], ["i", "+", "*", "(", ")", "EOF"]);
	l.add("E", "i", {"left": "E", "right": ["T", "E'"]});
	l.add("E", "(", {"left": "E", "right": ["T", "E'"]});
	l.add("E'", "+", {"left": "E'", "right": ["+", "T", "E'"]});
	l.add("E'", ")", {"left": "E'", "right": ["EMPTY"]});
	l.add("E'", "EOF", {"left": "E'", "right": ["EMPTY"]});
	l.add("T", "i", {"left": "T", "right": ["F", "T'"]});
	l.add("T", "(", {"left": "T", "right": ["F", "T'"]});
	l.add("T'", "+", {"left": "T'", "right": ["EMPTY"]});
	l.add("T'", "*", {"left": "T'", "right": ["*", "F", "T'"]});
	l.add("T'", ")", {"left": "T'", "right": ["EMPTY"]});
	l.add("T'", "EOF", {"left": "T'", "right": ["EMPTY"]});
	l.add("F", "i", {"left": "F", "right": ["i"]});
	l.add("F", "(", {"left": "F", "right": ["(", "E", ")"]});
	console.log(l.getTable());
	l.setInput(["i", "+", "i", "*", "(", "i", "+", "i", ")", "EOF"]);
	l.parse();

});
*/

/*
require(["MartixBuilder"], function(MartixBuilder, $) {
	var grammar = {
		"start": "E",
		"end": "EOF",
		"symbols": {
			"EOF": {
				"id": 0,
				"name": "EOF",
				"is_term": true
			},
			"EMPTY": {
				"id": 1,
				"name": "EMPTY",
				"is_term": true
			},
			"identifier": {
				"id": 1000,
				"name": "identifier",
				"is_term": true
			},
			"addition": {
				"id": 1001,
				"name": "addition",
				"is_term": true
			},
			"multiplication": {
				"id": 1002,
				"name": "multiplication",
				"is_term": true
			},
			"left_parenthesis": {
				"id": 1003,
				"name": "left_parenthesis",
				"is_term": true
			},
			"right_parenthesis": {
				"id": 1004,
				"name": "right_parenthesis",
				"is_term": true
			},
			"E": {
				"id": 2000,
				"name": "E",
				"is_term": false
			},
			"E'": {
				"id": 2001,
				"name": "E'",
				"is_term": false
			},
			"T": {
				"id": 2002,
				"name": "T",
				"is_term": false
			},
			"T'": {
				"id": 2003,
				"name": "T'",
				"is_term": false
			},
			"F": {
				"id": 2004,
				"name": "F",
				"is_term": false
			}
		},
		"nonterminals": ["E", "E'", "T", "T'", "F"],
		"terminals": ["identifier", "addition", "multiplication", "left_parenthesis", "right_parenthesis", "EOF"],
		"productions": [
			{
				"left": "E",
				"right": ["T", "E'"]
			},
			{
				"left": "E'",
				"right": ["addition", "T", "E'"]
			},
			{
				"left": "E'",
				"right": ["EMPTY"]
			},
			{
				"left": "T",
				"right": ["F", "T'"]
			},
			{
				"left": "T'",
				"right": ["multiplication", "F", "T'"]
			},
			{
				"left": "T'",
				"right": ["EMPTY"]
			},
			{
				"left": "F",
				"right": ["left_parenthesis", "E", "right_parenthesis"]
			},
			{
				"left": "F",
				"right": ["identifier"]
			}
		]
	}
	
	var mb = new MartixBuilder(grammar);
	var m = mb.build();
});
*/
/*
{
	"start": {symbol},
	"end": {symbol},
	"empty": {symbol},
	"symbols": {
		"EOF": {
			"id": 0,
			"type": 0,
			"name": "EOF",
			"is_term": true,
			"is_empty": false,
			"has_term": true,
			"has_empty": false,
			"follow": [{symbol}],
			"description",
			"productions": [
				{
					"first": [{symbol}],
					"symbols": [{symbol}]
				}
			]
		}
	}
	"nonterminals": [{symbol}],
	"terminals": [{symbol}],
	"table": {
		"E": {
			"identifier": production
		}
	}
}
*/


require(["GrammarBuilder", "ProductionGraphBuilder", "LLTableBuilder", "C", "jquery", "Lexer", "Parser"], function(GrammarBuilder, ProductionGraphBuilder, LLTableBuilder, C, $, Lexer, Parser) {
	/*
	var text = "\
NONTERMINAL E0\n\
NONTERMINAL E1\n\
NONTERMINAL T0\n\
NONTERMINAL T1\n\
NONTERMINAL F0\n\
TERMINAL    identifier\n\
TERMINAL    addition\n\
TERMINAL    multiplication\n\
TERMINAL    left_parenthesis\n\
TERMINAL    right_parenthesis\n\
START E0\n\
E0 -> T0 E1\n\
E1 -> addition T0 E1\n\
E1 -> EMPTY\n\
T0 -> F0 T1\n\
T1 -> multiplication F0 T1\n\
T1 -> EMPTY\n\
F0 -> left_parenthesis E0 right_parenthesis\n\
F0 -> identifier\n\
";
*/
	function convert(grammar, graph, first_collection, follow_collection, node_list, ll_table) {
		var map = {
			"start": null,
			"end": null,
			"empty": null,
			"symbols": {},
			"nonterminals": [],
			"terminals": [],
			"table": {}
		};
		var start, end, empty, nonterminals, terminals, table, symbols, symbol, production;
		for(var name in node_list) {
			symbol = {
				"id": node_list[name].id,
				"type": node_list[name].type,
				"name": name,
				"is_term": node_list[name].is_term,
				//"is_empty": false,
				"description": grammar.symbols[name].description
			};
			if(!symbol.is_term) {
				symbol.follow = [];
				symbol.productions = [];
				symbol.has_empty = node_list[name].has_empty;
				symbol.has_term = node_list[name].has_term;
			}
			map.symbols[name] = symbol;
		}
		
		map.start = map.symbols[graph.start];
		map.end = map.symbols[graph.end];
		map.empty = map.symbols[graph.empty];
		
		for(var name in node_list) {
			symbol = map.symbols[name];
			if(!symbol.is_term) {
				for(var i = 0;i < node_list[name].group.length;++i) {
					var first = [];
					for(var j = 0;j < node_list[name].group[i].first.length;++j) {
						first.push(map.symbols[ node_list[name].group[i].first[j] ]);
					}
					
					var nodes = [];
					for(var j = 0;j < node_list[name].group[i].nodes.length;++j) {
						nodes.push(map.symbols[ node_list[name].group[i].nodes[j].name ]);
					}
					symbol.productions.push({
						"first": first,
						"nodes": nodes
					});
				}
				map.nonterminals.push(map.symbols[ symbol.name ]);
			}else{
				if(symbol.name !== map.empty.name) {
					map.terminals.push(map.symbols[ symbol.name ]);
				}
			}
		}
		
		for(var primary in ll_table) {
			map.table[primary] = map.table[primary] || {};
			for(var secondary in ll_table[primary]) {
				map.table[primary][secondary] = {
					"left": map.symbols[      ll_table[primary][secondary].left    ],
					"right": (function(right){
						var arr = [];
						for(var i = 0;i < right.length;++i) {
							arr.push(map.symbols[ right[i] ]);
						}
						return arr;
					})(ll_table[primary][secondary].right)
				};
			}
		}
		
		return map;
	}

	var mb = new GrammarBuilder(C.GRAMMAR);
	var grammar = mb.getGrammar();
	var pgb = new ProductionGraphBuilder(grammar);
	var graph = pgb.getProductionGraph();
	var ltb = new LLTableBuilder(graph);
	var first_collection = ltb.getFirstCollection();
	var follow_collection = ltb.getFollowCollection();
	var node_list = ltb.getNodeList();
	ltb.build();
	var ll_table = ltb.getTable();
	var map = convert(grammar, graph, first_collection, follow_collection, node_list, ll_table);

	var text = $("#ccode").val();
	var lexer = new Lexer(text);
	
	console.log("Grammar");
	console.log(grammar);
	console.log("Graph");
	console.log(graph);
	console.log("First");
	console.log(first_collection);
	console.log("Follow");
	console.log(follow_collection);
	console.log("Node List");
	console.log(node_list);
	console.log("LL Table");
	console.log(ll_table);
	console.log("Map");
	console.log(map);
	var p = new Parser(map, lexer);
	p.parse();
	var syntax_tree = p.getSyntaxTree();
	var node;
	console.log(syntax_tree);
	//遍历语法树
	//转换成dot代码
	var queue = [syntax_tree];
	var dot_link = "";
	var dot_def = {};
	while(queue.length) {
		node = queue.pop();
		dot_def[node.id] = node.content || node.symbol.description;
		for(var i = 0;i < node.nodes.length;++i) {
			dot_link += node.id + "->" + node.nodes[i].id + "\n";
			queue.push(node.nodes[i]);
		}
	}
	var dot_def_text = "";
	for(var name in dot_def) {
		dot_def_text += name + '[ label="' + dot_def[name] + '" ];\n';
	}
	var dot_text = "digraph finite_state_machine {\n" +
		"rankdir = TB;\n" +
		dot_def_text +
		"node [shape = circle];\n" +
		dot_link +
		"}";
	console.log(dot_text);
});