define(function() {
	var _node_list;
	var _root;
	var _start;
	var _end;
	var _empty;
	var _first_collection;
	var _follow_collection;
	var _ll_table;
	
	function LLTableBuilder(graph) {
		_node_list = _clone(graph.node_list);
		_root = graph.root;
		_start = graph.start;
		_end = graph.end;
		_empty = graph.empty;
		
		_first_collection = _get_all_first(_node_list);
		_follow_collection = _get_all_follow(_node_list, _first_collection);
	}
	
	LLTableBuilder.prototype.build = function() {
		var first = _first_collection, follow = _follow_collection;
		var node_list = _node_list;
		var map = {};
		var terminal, terminals;
		var right;
		for(var name in node_list) {
			for(var i = 0;i < node_list[name].group.length;++i) {
				terminals = node_list[name].group[i].first;
				for(var j = 0;j < terminals.length;++j) {
					terminal = terminals[j];
					if(terminal !== "EMPTY") {
						right = _nodes_to_production_right(node_list[name].group[i].nodes);
						_use_first_rule(map, name, terminal, right);
					}else{
						_use_follow_rule(map, name);
					}
				}
			}
		}
		_ll_table = map;
	}
	
	LLTableBuilder.prototype.getFirst = function(x) {
		var first = [];
		if(x in _first_collection) {
			for(var i = 0;i < _first_collection[x].length;++i) {
				first.push(_first_collection[x][i]);
			}
		}
		return first;
	}
	
	LLTableBuilder.prototype.getFirstCollection = function() {
		var first_collection = {};
		for(var x in _first_collection) {
			first_collection[x] = [];
			for(var i = 0;i < _first_collection[x].length;++i) {
				first_collection[x].push(_first_collection[x][i]);
			}
		}
		return first_collection;
	}
	
	LLTableBuilder.prototype.getFollowCollection = function() {
		var follow_collection = {};
		for(var x in _follow_collection) {
			follow_collection[x] = [];
			for(var i = 0;i < _follow_collection[x].length;++i) {
				follow_collection[x].push(_follow_collection[x][i]);
			}
		}
		return follow_collection;
	}
	
	LLTableBuilder.prototype.getNodeList = function() {
		return _clone(_node_list);
	}
	
	LLTableBuilder.prototype.getTable = function() {
		return _clone(_ll_table);
	}
	
	function _nodes_to_production_right(nodes) {
		var right = [];
		for(var i = 0;i < nodes.length;++i) {
			right.push(nodes[i].name);
		}
		return right;
	}
	
	function _use_first_rule(M, nonterminal, terminal, right) {
		//var first = _first_collection[];
		M[nonterminal] = M[nonterminal] || {};
		M[nonterminal][terminal] = {
			"left": nonterminal,
			"right": right
		}
	}
	
	function _use_follow_rule(M, nonterminal) {
		var follow = _follow_collection[nonterminal];
		var termninal;
		for(var i = 0;i < follow.length;++i) {
			terminal = follow[i];
			M[nonterminal] = M[nonterminal] || {};
			M[nonterminal][terminal] = {
				"left": nonterminal,
				"right": ["EMPTY"]
			};
		}
	}
	
	function _clone(obj) {
		if(typeof obj !== "object") {
			return object;
		}
		
		var ret = Array.isArray(obj)?[]:{};
		var wm = new WeakMap();
		var queue = [
			{
				"old": obj,
				"new": ret
			}
		];
		var it;
		wm.set(obj, ret);
		while(queue.length) {
			it = queue.shift();
			
			for(var key in it["old"]) {
				if(typeof it["old"][key] !== "object") {
					it["new"][key] = it["old"][key];
				}else if(wm.has(it["old"][key])){
					it["new"][key] = wm.get(it["old"][key]);
				}else{
					it["new"][key] = Array.isArray( it["old"][key] )?[]:{};
					wm.set(it["old"][key], it["new"][key]);
					queue.push({
						"old": it["old"][key],
						"new": it["new"][key]
					});
				}				
			}
		}
		return ret;
	}
	
	function _get_all_first(node_list) {
		var first_collection = {};
		for(var name in node_list) {
			first_collection[name] = [];
			_get_first(node_list[name]);
		}
		for(var name in node_list) {
			if(node_list[name].is_term) {
				_add_to_first(first_collection[name], name);
			}else{
				for(var i = 0;i < node_list[name].group.length;++i) {
					_add_to_first(first_collection[name], node_list[name].group[i].first);
				}
			}
		}
		return first_collection;
	}
	/*
	//BUG 第二候选式的first集出现第一后续式的终结符
	function _get_symbol_first(node) {
		//var name, i_group, i_nodes;
		var it;
		var group, next_node;
		var first = [];
		var prev_group;
		var has_empty = false, has_term = false;
		if(node.is_term) {
			return [node.name];
		};
		var stack = [
			{
				"node": node,
				"i_group": 0,
				"i_nodes": 0,
				"has_empty": false,
				"has_term": false
			}
		];
		while(stack.length) {
			it = stack.pop();
			it.has_empty = has_empty;
			it.has_term = has_term;
			node = it.node;
outer:
			for(var i = it.i_group;i < node.group.length;++i) {
				//group = node.group[i];
				node.group[i].first = [];
				if(prev_group) {
					node.group[i].first = node.group[i].first || [];
					for(var j = 0;j < prev_group.first.length;++j) {
						if(node.group[i].first.indexOf(prev_group.first[j]) === -1) {
							node.group[i].first.push(prev_group.first[j]);
						}
					}
				}else{
				}
				for(var j = it.i_nodes;j < node.group[i].nodes.length;++j) {
					//node = ;
					next_node = node.group[i].nodes[j];

					if(next_node.is_term) {
						//保存first
						if(node.group[i].first.indexOf(next_node.name) === -1) {
							node.group[i].first.push(next_node.name);
						}
					}
					if(next_node.name === "EMPTY") {
						//向右
						it.has_empty = true;
						continue;
					}else if(next_node.is_term) {
						//保存，遍历下一个group
						it.has_term = true;
						first.push(next_node.name);
						break;
					}else if(it.has_term && !it.has_empty) {
						break;
					}{
						//深度+1
						node.has_empty = it.has_empty;
						node.has_term = it.has_term;
						stack.push({
							"node": node,
							"i_group": i,
							"i_nodes": j + 1,
							"has_empty": it.has_empty,
							"has_term": it.has_term
						});
						
						next_node.has_empty = false;
						next_node.has_term = false;
						stack.push({
							"node": next_node,
							"i_group": 0,
							"i_nodes": 0,
							"has_empty": false,
							"has_term": false
						});
						prev_group = null;
						break outer;
					}
				}
				//添加子节点的所有first
				//for(var j = 0;j < j < node.group[i].first.length;++j) {
				//	
				//}
				node.has_empty = it.has_empty;
				node.has_term = it.has_term;
				has_empty = it.has_empty;
				has_term = it.has_term;
				prev_group = node.group[i];
			}
		}
		if(it.has_empty) {
			first.push("EMPTY");
		}
		return first;
	}
	*/
	
	function _get_first(node) {
		var ret = {
			"has_empty": false,
			"has_term": false,
			"node": node,
			"first": []
		}
		
		if(node.is_term) {
			ret.has_term = true;
			if(node.name === "EMPTY") {
				ret.has_term = false;
				ret.has_empty = true;
			}
			_add_to_first(ret.first, node.name)
			return ret;
		}
		
		var first;
		var is_all_empty = true;

		var has_term = false, has_empty = false;
		first = [];
		for(var i = 0;i < node.group.length;++i) {
			node.group[i].first = [];
			for(var j = 0;j < node.group[i].nodes.length;++j) {
				ret = _get_first(node.group[i].nodes[j]);
				_add_to_first(first, ret.first);
				_add_to_first(node.group[i].first, ret.first);
				if(ret.has_term) {
					is_all_empty = false;
					has_term = ret.has_term;
					has_empty = ret.has_empty;
					break;
				}else if(ret.has_empty) {
					has_empty = ret.has_empty;
					continue;
				}else{
					console.assert(0);
				}
			}
			if(is_all_empty) {
				_add_to_first(first, "EMPTY");
			}
		}
		if(is_all_empty) {
			has_term = false;
			has_empty = true;
		}
		
		
		node.has_term = has_term;
		node.has_empty = has_empty;
		
		return {
			"has_term": has_term,
			"has_empty": has_empty,
			"first": first
		};
	}
	
	function _add_to_first(first, terminals) {
		if(Array.isArray(terminals)) {
			for(var i = 0;i < terminals.length;++i) {
				_add_to_first(first, terminals[i]);
			}
		}else if(first.indexOf(terminals) === -1) {
			first.push(terminals);
		}
	}
	
	function iterator(node_list) {
		
	}
	
	function _get_all_follow(node_list, first_collection) {
		var follow_collection = {}, follow;
		var first;
		var node, prev_node, curr_node;
		var last_non_empty = -1;
		var has_changed = false;
		
		for(var name in node_list) {
			if(!node_list[name].is_term) {
				follow_collection[name] = [];
			}
		}
		follow_collection[_start].push(_end);
		
		do {
			has_changed = false;
			//遍历每一条表达式
			for(var name in node_list) {
				if(node_list[name].is_term) { continue; }
				for(var i = 0;i < node_list[name].group.length;++i) {
					node = node_list[name].group[i].nodes;
					if(node.length > 0 && !node[0].is_term && !node[0].has_empty) {
						last_non_empty = 0;
					}
					for(var js = 1;js < node.length;++js) {
						prev_node = node[js - 1];
						curr_node = node[js];
						if(prev_node.is_term) { continue; }
						if(!curr_node.is_term && !curr_node.has_empty) {
							last_non_empty = j;
						}else if(curr_node.is_term) {
							last_non_empty = -1;
						}
						first = first_collection[curr_node.name];
						has_changed = _merge_follow(follow_collection[prev_node.name], first) || has_changed;
					}
					if(last_non_empty >= 0) {
						//A->aB 或 A->aBb 且 b=>EMPTY
						for(var j = last_non_empty;j < node.length;++j) {
							_merge_follow(follow_collection[node[j].name], follow_collection[name]);
						}
					}
					last_non_empty = -1;
				}
			}
			/*
			//去重
			var unique;
			for(var name in follow_collection) {
				unique = [];
				follow = follow_collection[name];
				for(var i = 0;i < follow.length;++i) {
					if(follow[i] !== "EMPTY" && unique.indexOf(follow[i]) === -1) {
						unique.push(follow[i]);
					}
				}
				follow_collection[name] = unique;
			}
			*/
		}while(has_changed);
		return follow_collection;
	}
	/*
	function _follow_collection(node_list, first_collection) {
		var follow_collection = {}, follow;
		var first;
		var node, prev_node, curr_node;
		follow_collection[_start] = [_end];
		for(var name in node_list) {
			if(node_list[name].is_term) { continue; }
			for(var i = 0;i < node_list[name].group.length;++i) {
				node = node_list[name].group[i].nodes;
				for(var js = 1;js < node.length;++js) {
					prev_node = node[js - 1];
					curr_node = node[js];
					if(prev_node.is_term) { continue; }
					first = first_collection[curr_node.name];
					follow = follow_collection[prev_node.name] = follow_collection[prev_node.name] || [];
					follow_collection[prev_node.name] = follow.concat(first);
				}
			}
		}
		
		//去重
		var unique;
		for(var name in follow_collection) {
			unique = [];
			follow = follow_collection[name];
			for(var i = 0;i < follow.length;++i) {
				if(follow[i] !== "EMPTY" && unique.indexOf(follow[i]) === -1) {
					unique.push(follow[i]);
				}
			}
			follow_collection[name] = unique;
		}
	}
	*/
	function _merge_follow(dst, src) {
		var has_changed = false;
		for(var i = 0;i < src.length;++i) {
			if(src[i] === "EMPTY") {
				continue;
			}
			if(dst.indexOf(src[i]) !== -1) {
				continue;
			}
			dst.push(src[i]);
			has_changed = true;
		}
		return has_changed
	}

	
	return LLTableBuilder;
});