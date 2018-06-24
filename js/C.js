define(function() {
	function C() { }
	C.LEXER = {
		IDENTIFIER                      : 1000,  //标识符
		//EOF                             : 1001,  //文件结尾
		DECIMAL                         : 1002,  //十进制数
		OCTAL                           : 1003,  //八进制数
		HEXADECIMAL                     : 1004,  //十六进制数
		FLOAT                           : 1005,  //浮点数
		BLOCK_COMMENT                   : 1006,  //块注释
		LINE_COMMENT                    : 1007,  //行注释
		STRING                          : 1008,  //字符串
		CHARACTER                       : 1009,  //字符
		ASSIGNMENT                      : 1010,  //    =
		ADDITION                        : 1011,  //    +
		SUBTRACTION                     : 1012,  //    -
		MULTIPLICATION                  : 1013,  //    *
		DIVISION                        : 1014,  //    /
		MODULO                          : 1015,  //    %
		INCREMENT                       : 1016,  //    ++
		DECREMENT                       : 1017,  //    --
		EQUAL_TO                        : 1018,  //    ==
		NOT_EQUAL_TO                    : 1019,  //    !=
		GREATER_THAN                    : 1020,  //    >
		LESS_THAN                       : 1021,  //    <
		GREATER_THAN_OR_EQUAL_TO        : 1022,  //    >=
		LESS_THAN_OR_EQUAL_TO           : 1023,  //    <=
		LOGICAL_NEGATION                : 1024,  //    !
		LOGICAL_AND                     : 1025,  //    &&
		LOGICAL_OR                      : 1026,  //    ||
		BITWISE_NOT                     : 1027,  //    ~
		BITWISE_AND                     : 1028,  //    &
		BITWISE_OR                      : 1029,  //    |
		BITWISE_XOR                     : 1030,  //    ^
		BITWISE_LEFT_SHIFT              : 1031,  //    <<
		BITWISE_RIGHT_SHIFT             : 1032,  //    >>
		ADDITION_ASSIGNMENT             : 1033,  //    +=
		SUBTRACTION_ASSIGNMENT          : 1034,  //    -=
		MULTIPLICATION_ASSIGNMENT       : 1035,  //    *=
		DIVISION_ASSIGNMENT             : 1036,  //    /=
		MODULO_ASSIGNMENT               : 1037,  //    %=
		BITWISE_AND_ASSIGNMENT          : 1038,  //    &=
		BITWISE_OR_ASSIGNMENT           : 1039,  //    |=
		BITWISE_XOR_ASSIGNMENT          : 1040,  //    ^=
		BITWISE_LEFT_SHIFT_ASSIGNMENT   : 1041,  //    <<=
		BITWISE_RIGHT_SHIFT_ASSIGNMENT  : 1042,  //    >>=
		LEFT_SUBSCRIPT                  : 1043,  //    [
		RIGHT_SUBSCRIPT                 : 1044,  //    ]
		STRUCTURE_DEREFERENCE           : 1045,  //    ->
		STRUCTURE_REFERENCE             : 1046,  //    .
		LEFT_PARENTHESIS                : 1047,  //    (
		RIGHT_PARENTHESIS               : 1048,  //    )
		LEFT_BRACE                      : 1049,  //    {
		RIGHT_BRACE                     : 1050,  //    }
		QUESTION_MARK                   : 1051,  //    ?
		COLON                           : 1052,  //    :
		COMMA                           : 1053,  //    ,
		SEMICOLON                       : 1054,  //    ;
		SHARP                           : 1055,  //    #
		LINE_CONTINUE                   : 1056,  //    \\n
		SPACE                           : 1057,  //    [\f\t\v]
	};

	C.REGEXP = [
		{
			"id": C.LEXER.SPACE,
			"name": "space",
			"regexp": /[\s\r\n]+/g,
			"group": 0
		},
		{
			"id": C.LEXER.IDENTIFIER,
			"name": "identifier",
			"regexp": /[a-zA-Z_][\da-zA-Z_]*/g,
			"group": 0
		},
		{
			"id": C.LEXER.DECIMAL,
			"name": "decimal",
			"regexp": /([1-9]\d*|0)(u|l|f|ul|lu|lf|uf|luf|ulf)?/ig,
			"group": 0
		},
		{
			"id": C.LEXER.OCTAL,
			"name": "octal",
			"regexp": /0\d+(u|l|f|ul|lu|lf|uf|luf|ulf)?/ig,
			"group": 0
		},
		{
			"id": C.LEXER.HEXADECIMAL,
			"name": "hexadecimal",
			"regexp": /0x[\da-fA-F]+/g,
			"group": 0
		},
		{
			"id": C.LEXER.FLOAT,
			"name": "float",
			"regexp": /\.\d+|\d+\.|\d+\.\d+|\d+[\+\-]?e\d+/g,
			"group": 0
		},
		{
			"id": C.LEXER.BLOCK_COMMENT,
			"name": "block_comment",
			"regexp": /\/\*[\s\S]*?\*\//g,
			"group": 0
		},
		{
			"id": C.LEXER.LINE_COMMENT,
			"name": "line_comment",
			"regexp": /(\/\/.*)\r?\n/g,
			"group": 1
		},
		{
			"id": C.LEXER.STRING,
			"name": "string",
			"regexp": /"([^\\"]|\\[abfnrtv\\"\?0]|\d{3}|\\x[\da-fA-F][\da-fA-F])*"/g,
			"group": 0
		},
		{
			"id": C.LEXER.CHARACTER,
			"name": "character",
			"regexp": /'([^\\']|\\[abfnrtv\\'\?0]|\d{3}|\\x[\da-fA-F][\da-fA-F])*'/g,
			"group": 0
		},
		{
			"id": C.LEXER.INCREMENT,
			"name": "increment",
			"regexp": /\+\+/g,
			"group": 0
		},
		{
			"id": C.LEXER.ADDITION_ASSIGNMENT,
			"name": "addition_assignment",
			"regexp": /\+=/g,
			"group": 0
		},
		{
			"id": C.LEXER.ADDITION,
			"name": "addition",
			"regexp": /\+/g,
			"group": 0
		},
		{
			"id": C.LEXER.DECREMENT,
			"name": "decrement",
			"regexp": /--/g,
			"group": 0
		},
		{
			"id": C.LEXER.SUBTRACTION_ASSIGNMENT,
			"name": "subtraction_assignment",
			"regexp": /-=/g,
			"group": 0
		},
		{
			"id": C.LEXER.STRUCTURE_DEREFERENCE,
			"name": "structure_dereference",
			"regexp": /->/g,
			"group": 0
		},
		{
			"id": C.LEXER.SUBTRACTION,
			"name": "subtraction",
			"regexp": /-/g,
			"group": 0
		},
		{
			"id": C.LEXER.MULTIPLICATION_ASSIGNMENT,
			"name": "multiplication_assignment",
			"regexp": /\*=/g,
			"group": 0
		},
		{
			"id": C.LEXER.MULTIPLICATION,
			"name": "multiplication",
			"regexp": /\*/g,
			"group": 0
		},
		{
			"id": C.LEXER.DIVISION_ASSIGNMENT,
			"name": "division_assignment",
			"regexp": /\/=/g,
			"group": 0
		},
		{
			"id": C.LEXER.DIVISION,
			"name": "division",
			"regexp": /\//g,
			"group": 0
		},
		{
			"id": C.LEXER.MODULO_ASSIGNMENT,
			"name": "modulo_assignment",
			"regexp": /%=/g,
			"group": 0
		},
		{
			"id": C.LEXER.MODULO,
			"name": "modulo",
			"regexp": /%/g,
			"group": 0
		},
		{
			"id": C.LEXER.LOGICAL_AND,
			"name": "logical_and",
			"regexp": /&&/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_AND_ASSIGNMENT,
			"name": "bitwise_and_assignment",
			"regexp": /&=/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_AND,
			"name": "bitwise_and",
			"regexp": /&/g,
			"group": 0
		},
		{
			"id": C.LEXER.LOGICAL_OR,
			"name": "logical_or",
			"regexp": /\|\|/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_OR_ASSIGNMENT,
			"name": "bitwise_or_assignment",
			"regexp": /\|=/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_OR,
			"name": "bitwise_or",
			"regexp": /\|/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_XOR_ASSIGNMENT,
			"name": "bitwise_xor_assignment",
			"regexp": /\^=/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_XOR,
			"name": "bitwise_xor",
			"regexp": /\^/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_LEFT_SHIFT_ASSIGNMENT,
			"name": "bitwise_left_shift_assignment",
			"regexp": /<<=/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_LEFT_SHIFT,
			"name": "bitwise_left_shift",
			"regexp": /<</g,
			"group": 0
		},
		{
			"id": C.LEXER.LESS_THAN_OR_EQUAL_TO,
			"name": "less_than_or_equal_to",
			"regexp": /<=/g,
			"group": 0
		},
		{
			"id": C.LEXER.LESS_THAN,
			"name": "less_than",
			"regexp": /</g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_RIGHT_SHIFT_ASSIGNMENT,
			"name": "bitwise_right_shift_assignment",
			"regexp": />>=/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_RIGHT_SHIFT,
			"name": "bitwise_right_shift",
			"regexp": />>/g,
			"group": 0
		},
		{
			"id": C.LEXER.GREATER_THAN_OR_EQUAL_TO,
			"name": "greater_than_or_equal_to",
			"regexp": />=/g,
			"group": 0
		},
		{
			"id": C.LEXER.GREATER_THAN,
			"name": "greater_than",
			"regexp": />/g,
			"group": 0
		},
		{
			"id": C.LEXER.EQUAL_TO,
			"name": "equal_to",
			"regexp": /==/g,
			"group": 0
		},
		{
			"id": C.LEXER.ASSIGNMENT,
			"name": "assignment",
			"regexp": /=/g,
			"group": 0
		},
		{
			"id": C.LEXER.NOT_EQUAL_TO,
			"name": "not_equal_to",
			"regexp": /!=/g,
			"group": 0
		},
		{
			"id": C.LEXER.LOGICAL_NEGATION,
			"name": "logical_negation",
			"regexp": /!/g,
			"group": 0
		},
		{
			"id": C.LEXER.BITWISE_NOT,
			"name": "bitwise_not",
			"regexp": /~/g,
			"group": 0
		},
		{
			"id": C.LEXER.STRUCTURE_REFERENCE,
			"name": "structure_reference",
			"regexp": /\./g,
			"group": 0
		},
		{
			"id": C.LEXER.LEFT_SUBSCRIPT,
			"name": "left_subscript",
			"regexp": /\[/g,
			"group": 0
		},
		{
			"id": C.LEXER.RIGHT_SUBSCRIPT,
			"name": "right_subscript",
			"regexp": /\]/g,
			"group": 0
		},
		{
			"id": C.LEXER.LEFT_PARENTHESIS,
			"name": "left_parenthesis",
			"regexp": /\(/g,
			"group": 0
		},
		{
			"id": C.LEXER.RIGHT_PARENTHESIS,
			"name": "right_parenthesis",
			"regexp": /\)/g,
			"group": 0
		},
		{
			"id": C.LEXER.LEFT_BRACE,
			"name": "left_braces",
			"regexp": /\{/g,
			"group": 0
		},
		{
			"id": C.LEXER.RIGHT_BRACE,
			"name": "right_braces",
			"regexp": /\}/g,
			"group": 0
		},
		{
			"id": C.LEXER.QUESTION_MARK,
			"name": "question_mark",
			"regexp": /\?/g,
			"group": 0
		},
		{
			"id": C.LEXER.COLON,
			"name": "colon",
			"regexp": /:/g,
			"group": 0
		},
		{
			"id": C.LEXER.COMMA,
			"name": "comma",
			"regexp": /,/g,
			"group": 0
		},
		{
			"id": C.LEXER.SEMICOLON,
			"name": "semicolon",
			"regexp": /;/g,
			"group": 0
		},
		{
			"id": C.LEXER.SHARP,
			"name": "sharp",
			"regexp": /#/g,
			"group": 0
		},
		{
			"id": C.LEXER.LINE_CONTINUE,
			"name": "line_continue",
			"regexp": /\\\r?\n/g,
			"group": 0
		}
	];
	
		
	/*C.GRAMMAR = 
		"NONTERMINAL E0 2000\n" +
		"NONTERMINAL E1 2001\n" +
		"NONTERMINAL T0 2002\n" +
		"NONTERMINAL T1 2003\n" +
		"NONTERMINAL F0 2004\n" +
		"TERMINAL    identifier            1000\n" +
		"TERMINAL    addition              1011\n" +
		"TERMINAL    multiplication        1013\n" +
		"TERMINAL    left_parenthesis      1047\n" +
		"TERMINAL    right_parenthesis     1048\n" +
		"START E0\n" +
		"E0 -> T0 E1\n" +
		"E1 -> addition T0 E1\n" +
		"E1 -> EMPTY\n" +
		"T0 -> F0 T1\n" +
		"T1 -> multiplication F0 T1\n" +
		"T1 -> EMPTY\n" +
		"F0 -> left_parenthesis E0 right_parenthesis\n" +
		"F0 -> identifier";*/
	C.GRAMMAR = 
		"NONTERMINAL 表达式          2000 E0\n" +
		"NONTERMINAL 优先级五点五    2002 P5_5\n" +
		"NONTERMINAL 优先级五        2003 P5\n" +
		"NONTERMINAL 优先级四点五    2004 P4_5\n" +
		"NONTERMINAL 优先级四        2005 P4\n" +
		"NONTERMINAL 优先级三点五    2006 P3_5\n" +
		"NONTERMINAL 优先级一        2007 P1\n" +
		"TERMINAL =                  1010 assignment\n" +
		"TERMINAL -                  1012 subtraction\n" +
		"TERMINAL +                  1011 addition\n" +
		"TERMINAL *                  1013 multiplication\n" +
		"TERMINAL /                  1014 division\n" +
		"TERMINAL %                  1015 modulo\n" +
		"TERMINAL (                  1047 left_parenthesis\n" +
		"TERMINAL )                  1048 right_parenthesis\n" +
		"TERMINAL 标识符             1000 identifier\n" +
		"TERMINAL 数字               1002 digit\n" +
		"START 表达式\n" +
		"表达式 -> 优先级五 优先级五点五\n" +
		"优先级五点五 -> = 优先级五 优先级五点五\n" +
		"优先级五点五 -> EMPTY\n" +
		"优先级五 -> 优先级四 优先级四点五\n" +
		"优先级五 -> 优先级四 优先级四点五\n" +
		"优先级五 -> 优先级四 优先级四点五\n" +
		"优先级四点五 -> - 优先级四 优先级四点五\n" +
		"优先级四点五 -> + 优先级四 优先级四点五\n" +
		"优先级四点五 -> EMPTY\n" +
		"优先级四 -> 优先级一 优先级三点五\n" +
		"优先级四 -> 优先级一 优先级三点五\n" +
		"优先级四 -> 优先级一 优先级三点五\n" +
		"优先级三点五 -> * 优先级一 优先级三点五\n" +
		"优先级三点五 -> / 优先级一 优先级三点五\n" +
		"优先级三点五 -> % 优先级一 优先级三点五\n" +
		"优先级三点五 -> EMPTY\n" +
		"优先级一 -> ( 表达式 )\n" +
		"优先级一 -> 标识符\n" +
		"优先级一 -> 数字\n";

	return C;
});