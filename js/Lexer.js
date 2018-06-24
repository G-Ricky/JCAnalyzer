define(["C"], function (C) {
	/*
	var PARSER = {
		IDENTIFIER                      :  0,  //标识符
		EOF                             :  1,  //文件结尾
		DECIMAL                         :  2,  //十进制数
		OCTAL                           :  3,  //八进制数
		HEXADECIMAL                     :  4,  //十六进制数
		FLOAT                           :  5,  //浮点数
		BLOCK_COMMENT                   :  6,  //块注释
		LINE_COMMENT                    :  7,  //行注释
		STRING                          :  8,  //字符串
		CHARACTER                       :  9,  //字符
		ASSIGNMENT                      : 10,  //    =
		ADDITION                        : 11,  //    +
		SUBTRACTION                     : 12,  //    -
		MULTIPLICATION                  : 13,  //    *
		DIVISION                        : 14,  //    /
		MODULO                          : 15,  //    %
		INCREMENT                       : 16,  //    ++
		DECREMENT                       : 17,  //    --
		EQUAL_TO                        : 18,  //    ==
		NOT_EQUAL_TO                    : 19,  //    !=
		GREATER_THAN                    : 20,  //    >
		LESS_THAN                       : 21,  //    <
		GREATER_THAN_OR_EQUAL_TO        : 22,  //    >=
		LESS_THAN_OR_EQUAL_TO           : 23,  //    <=
		LOGICAL_NEGATION                : 24,  //    !
		LOGICAL_AND                     : 25,  //    &&
		LOGICAL_OR                      : 26,  //    ||
		BITWISE_NOT                     : 27,  //    ~
		BITWISE_AND                     : 28,  //    &
		BITWISE_OR                      : 29,  //    |
		BITWISE_XOR                     : 30,  //    ^
		BITWISE_LEFT_SHIFT              : 31,  //    <<
		BITWISE_RIGHT_SHIFT             : 32,  //    >>
		ADDITION_ASSIGNMENT             : 33,  //    +=
		SUBTRACTION_ASSIGNMENT          : 34,  //    -=
		MULTIPLICATION_ASSIGNMENT       : 35,  //    *=
		DIVISION_ASSIGNMENT             : 36,  //    /=
		MODULO_ASSIGNMENT               : 37,  //    %=
		BITWISE_AND_ASSIGNMENT          : 38,  //    &=
		BITWISE_OR_ASSIGNMENT           : 39,  //    |=
		BITWISE_XOR_ASSIGNMENT          : 40,  //    ^=
		BITWISE_LEFT_SHIFT_ASSIGNMENT   : 41,  //    <<=
		BITWISE_RIGHT_SHIFT_ASSIGNMENT  : 42,  //    >>=
		LEFT_SUBSCRIPT                  : 43,  //    [
		RIGHT_SUBSCRIPT                 : 44,  //    ]
		STRUCTURE_DEREFERENCE           : 45,  //    ->
		STRUCTURE_REFERENCE             : 46,  //    .
		LEFT_PARENTHESIS                : 47,  //    (
		RIGHT_PARENTHESIS               : 48,  //    )
		LEFT_BRACE                      : 49,  //    {
		RIGHT_BRACE                     : 50,  //    }
		QUESTION_MARK                   : 51,  //    ?
		COLON                           : 52,  //    :
		COMMA                           : 53,  //    ,
		SEMICOLON                       : 54,  //    ;
		SHARP                           : 55,  //    #
		LINE_CONTINUE                   : 56,  //    \\n
		SPACE                           : 57,  //    [\f\t\v]
	}

	var REGEXP = [
		{
			"id": PARSER.ID_SPACE,
			"name": "space",
			"regexp": /[\s\r\n]+/g,
			"group": 0
		},
		{
			"id": PARSER.ID_IDENTIFIER,
			"name": "identifier",
			"regexp": /[a-zA-Z_][\da-zA-Z_]* /g,
			"group": 0
		},
		{
			"id": PARSER.ID_DECIMAL,
			"name": "decimal",
			"regexp": /([1-9]\d*|0)(u|l|f|ul|lu|lf|uf|luf|ulf)?/ig,
			"group": 0
		},
		{
			"id": PARSER.ID_OCTAL,
			"name": "octal",
			"regexp": /0\d+(u|l|f|ul|lu|lf|uf|luf|ulf)?/ig,
			"group": 0
		},
		{
			"id": PARSER.ID_HEXADECIMAL,
			"name": "hexadecimal",
			"regexp": /0x[\da-fA-F]+/g,
			"group": 0
		},
		{
			"id": PARSER.ID_FLOAT,
			"name": "float",
			"regexp": /\.\d+|\d+\.|\d+\.\d+|\d+[\+\-]?e\d+/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BLOCK_COMMENT,
			"name": "block_comment",
			"regexp": /\/\*[\s\S]*?\*\//g,
			"group": 0
		},
		{
			"id": PARSER.ID_LINE_COMMENT,
			"name": "line_comment",
			"regexp": /(\/\/.*)\r?\n/g,
			"group": 1
		},
		{
			"id": PARSER.ID_STRING,
			"name": "string",
			"regexp": /"([^\\"]|\\[abfnrtv\\"\?0]|\d{3}|\\x[\da-fA-F][\da-fA-F])*"/g,
			"group": 0
		},
		{
			"id": PARSER.ID_CHARACTER,
			"name": "character",
			"regexp": /'([^\\']|\\[abfnrtv\\'\?0]|\d{3}|\\x[\da-fA-F][\da-fA-F])*'/g,
			"group": 0
		},
		{
			"id": PARSER.ID_INCREMENT,
			"name": "increment",
			"regexp": /\+\+/g,
			"group": 0
		},
		{
			"id": PARSER.ID_ADDITION_ASSIGNMENT,
			"name": "addition_assignment",
			"regexp": /\+=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_ADDITION,
			"name": "addition",
			"regexp": /\+/g,
			"group": 0
		},
		{
			"id": PARSER.ID_DECREMENT,
			"name": "decrement",
			"regexp": /--/g,
			"group": 0
		},
		{
			"id": PARSER.ID_SUBTRACTION_ASSIGNMENT,
			"name": "subtraction_assignment",
			"regexp": /-=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_STRUCTURE_DEREFERENCE,
			"name": "structure_dereference",
			"regexp": /->/g,
			"group": 0
		},
		{
			"id": PARSER.ID_SUBTRACTION,
			"name": "subtraction",
			"regexp": /-/g,
			"group": 0
		},
		{
			"id": PARSER.ID_MULTIPLICATION_ASSIGNMENT,
			"name": "multiplication_assignment",
			"regexp": /\*=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_MULTIPLICATION,
			"name": "multiplication",
			"regexp": /\* /g,
			"group": 0
		},
		{
			"id": PARSER.ID_DIVISION_ASSIGNMENT,
			"name": "division_assignment",
			"regexp": /\/=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_DIVISION,
			"name": "division",
			"regexp": /\//g,
			"group": 0
		},
		{
			"id": PARSER.ID_MODULO_ASSIGNMENT,
			"name": "modulo_assignment",
			"regexp": /%=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_MODULO,
			"name": "modulo",
			"regexp": /%/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LOGICAL_AND,
			"name": "logical_and",
			"regexp": /&&/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_AND_ASSIGNMENT,
			"name": "bitwise_and_assignment",
			"regexp": /&=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_AND,
			"name": "bitwise_and",
			"regexp": /&/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LOGICAL_OR,
			"name": "logical_or",
			"regexp": /\|\|/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_OR_ASSIGNMENT,
			"name": "bitwise_or_assignment",
			"regexp": /\|=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_OR,
			"name": "bitwise_or",
			"regexp": /\|/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_XOR_ASSIGNMENT,
			"name": "bitwise_xor_assignment",
			"regexp": /\^=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_XOR,
			"name": "bitwise_xor",
			"regexp": /\^/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_LEFT_SHIFT_ASSIGNMENT,
			"name": "bitwise_left_shift_assignment",
			"regexp": /<<=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_LEFT_SHIFT,
			"name": "bitwise_left_shift",
			"regexp": /<</g,
			"group": 0
		},
		{
			"id": PARSER.ID_LESS_THAN_OR_EQUAL_TO,
			"name": "less_than_or_equal_to",
			"regexp": /<=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LESS_THAN,
			"name": "less_than",
			"regexp": /</g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_RIGHT_SHIFT_ASSIGNMENT,
			"name": "bitwise_right_shift_assignment",
			"regexp": />>=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_RIGHT_SHIFT,
			"name": "bitwise_right_shift",
			"regexp": />>/g,
			"group": 0
		},
		{
			"id": PARSER.ID_GREATER_THAN_OR_EQUAL_TO,
			"name": "greater_than_or_equal_to",
			"regexp": />=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_GREATER_THAN,
			"name": "greater_than",
			"regexp": />/g,
			"group": 0
		},
		{
			"id": PARSER.ID_EQUAL_TO,
			"name": "equal_to",
			"regexp": /==/g,
			"group": 0
		},
		{
			"id": PARSER.ID_ASSIGNMENT,
			"name": "assignment",
			"regexp": /=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_NOT_EQUAL_TO,
			"name": "not_equal_to",
			"regexp": /!=/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LOGICAL_NEGATION,
			"name": "logical_negation",
			"regexp": /!/g,
			"group": 0
		},
		{
			"id": PARSER.ID_BITWISE_NOT,
			"name": "bitwise_not",
			"regexp": /~/g,
			"group": 0
		},
		{
			"id": PARSER.ID_STRUCTURE_REFERENCE,
			"name": "structure_reference",
			"regexp": /\./g,
			"group": 0
		},
		{
			"id": PARSER.ID_LEFT_SUBSCRIPT,
			"name": "left_subscript",
			"regexp": /\[/g,
			"group": 0
		},
		{
			"id": PARSER.ID_RIGHT_SUBSCRIPT,
			"name": "right_subscript",
			"regexp": /\]/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LEFT_PARENTHESIS,
			"name": "left_parenthesis",
			"regexp": /\(/g,
			"group": 0
		},
		{
			"id": PARSER.ID_RIGHT_PARENTHESIS,
			"name": "right_parenthesis",
			"regexp": /\)/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LEFT_BRACE,
			"name": "left_braces",
			"regexp": /\{/g,
			"group": 0
		},
		{
			"id": PARSER.ID_RIGHT_BRACE,
			"name": "right_braces",
			"regexp": /\}/g,
			"group": 0
		},
		{
			"id": PARSER.ID_QUESTION_MARK,
			"name": "question_mark",
			"regexp": /\?/g,
			"group": 0
		},
		{
			"id": PARSER.ID_COLON,
			"name": "colon",
			"regexp": /:/g,
			"group": 0
		},
		{
			"id": PARSER.ID_COMMA,
			"name": "comma",
			"regexp": /,/g,
			"group": 0
		},
		{
			"id": PARSER.ID_SEMICOLON,
			"name": "semicolon",
			"regexp": /;/g,
			"group": 0
		},
		{
			"id": PARSER.ID_SHARP,
			"name": "sharp",
			"regexp": /#/g,
			"group": 0
		},
		{
			"id": PARSER.ID_LINE_CONTINUE,
			"name": "line_continue",
			"regexp": /\\\r?\n/g,
			"group": 0
		}
	];
	*/
	var _source_code;
	var _pos;
	
	function Lexer(code) {
		_source_code = code;
		_pos = 0;
	}

	Lexer.prototype.getNextToken = function(ignoreError = false) {
		if(this.eof()) {
			return C.PARSER.EOF;
		}
		var regexp, group, match;
		var token;
		for(var i = 0;i < C.REGEXP.length;++i) {
			regexp = C.REGEXP[i].regexp;
			group  = C.REGEXP[i].group;
			
			regexp.lastIndex = _pos;
			match = regexp.exec(_source_code);
			if(match && match.index === _pos) {
				token = {
					id: 0,
					type: C.REGEXP[i].id,
					content: match[group],
					name: C.REGEXP[i].name
				}
				_pos = regexp.lastIndex;
				return token;
			}
		}
		if(!ignoreError) {
			throw new Error("Unexpected character");
		}
		return null;
	}

	
	Lexer.prototype.reset = function() {
		_pos = 0;
	}
	
	Lexer.prototype.eof = function() {
		return _pos >= _source_code.length;
	}
	return Lexer;
});