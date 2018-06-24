define("ProductionGraphBuilder", ["Common"], function(Common) {
	var _root;
	var _node_list;
	var _grammar;
	
	function ProductionGraphBuilder(grammar) {
		_grammar = grammar;
		
		var node_list = _create_node_list(_grammar.symbols);
		var root = node_list[_grammar.start];
		_create_production_graph(node_list, _grammar.productions);
		_root = root;
		_node_list = node_list;
	}
	
	ProductionGraphBuilder.prototype.getProductionGraph = function() {
		var new_node_list = _clone_node_list(_node_list);
		var root = new_node_list[_grammar.start];
		return {
			"start": _grammar.start,
			"end": _grammar.end,
			"empty": _grammar.empty,
			"node_list": new_node_list,
			"root": root
		};
	}
	
	ProductionGraphBuilder.prototype.getNodeList = function() {
		return Common.clone(_node_list);
	}
	
	function _clone_node_list(node_list) {
		var new_node_list = {};
		var group, nodes, new_group, new_nodes;
		for(var name in _node_list) {
			new_node_list[name] = {
				"id": _node_list[name].id,
				"type": _node_list[name].type,
				"name": _node_list[name].name,
				"is_term": _node_list[name].is_term,
				"group": []
			}
		}
		for(var name in _node_list) {
			group = _node_list[name].group;
			new_group = new_node_list[name].group;
			for(var i = 0;i < group.length;++i) {
				new_group.push({
					"nodes": []
				});
				nodes = group[i].nodes;
				new_nodes = new_group[i].nodes;
				for(var j = 0;j < nodes.length;++j) {
					new_nodes.push(new_node_list[nodes[j].name]);
				}
			}
		}
		return new_node_list;
	}
	
	
	//
	function _create_node_list(symbols) {
		var node_list = {}, node;
		var id = 0;
		for(var name in symbols) {
			node = _create_node(id++, symbols[name].name, symbols[name].id, symbols[name].is_term);
			node_list[node.name] = node;
		}
		return node_list;
	}
	
	function _create_node(id, name, type, is_term) {
		return {
			"id": id,
			"type": type,
			"name": name,
			"is_term": is_term,
			"group": []
		}
	}
	
	function _create_production_graph(node_list, productions) {
		for(var i = 0;i < productions.length;++i) {
			_create_production_node(node_list, productions[i]);
		}
	}
	
	function _create_production_node(node_list, production) {
		var parent, children = [];
		var name = production.left;
		parent = node_list[name];
		for(var i = 0;i < production.right.length;++i) {
			name = production.right[i];
			children.push(node_list[name]);
		}
		_link_production_node(parent, children);
	}
	
	//处理并列的候选式（由于不支持“或”符号）
	//parent    children
	//E0      ->T0 E1
	//每次处理一条
	//E0      ->EMPTY
	function _link_production_node(parent, children) {
		parent.group.push({
			"nodes": children
		});
	}
	
	function _query_node(node_list, query_name) {
		return node_list[query_name];
	}
	
	function _query_symbol(symbols, query_name) {
		return symbols[query_name];
	}
	
	function _is_term(symbols, query_name) {
		return symbols[query_name].is_term;
	}
	return ProductionGraphBuilder;
});