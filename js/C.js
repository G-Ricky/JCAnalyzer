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
	C.PARSER = {
		INTEGER                         : 1300,
		KW_AUTO                         : 1200,
		KW_BREAK                        : 1201,
		KW_CASE                 		: 1202,
		KW_CHAR                         : 1203,
		KW_CONST                        : 1204,
		KW_CONTINUE                     : 1205,
		KW_DEFAULT                      : 1206,
		KW_DO                           : 1207,
		KW_DOUBLE                       : 1208,
		KW_ELSE                         : 1209,
		KW_ENUM                         : 1210,
		KW_EXTERN                       : 1211,
		KW_FLOAT                        : 1212,
		KW_FOR                          : 1213,
		KW_GOTO                         : 1214,
		KW_IF                           : 1215,
		KW_INT                          : 1216,
		KW_LONG                         : 1217,
		KW_REGISTER                     : 1218,
		KW_RETURN                       : 1219,
		KW_SHORT                        : 1220,
		KW_SIGNED                       : 1221,
		KW_SIZEOF                       : 1222,
		KW_STATIC                       : 1223,
		KW_STRUCT                       : 1224,
		KW_SWITCH                       : 1225,
		KW_TYPEDEF                      : 1226,
		KW_UNION                        : 1227,
		KW_UNSIGNED                     : 1228,
		KW_VOID                         : 1229,
		KW_VOLATILE                     : 1230,
		KW_WHILE                        : 1231
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
	
	C.GRAMMAR = 
		"NONTERMINAL 表达式          2000 Expression\n" +
		"NONTERMINAL 优先级十五点五  2028 P15_5\n" +
		"NONTERMINAL 优先级十五      2027 P15\n" +
		"NONTERMINAL 优先级十四点五  2026 P14_5\n" +
		"NONTERMINAL 优先级十四      2025 P14\n" +
		"NONTERMINAL 优先级十三点五  2024 P13_5\n" +
		"NONTERMINAL 优先级十三      2023 P13\n" +
		"NONTERMINAL 优先级十二点五  2022 P12_5\n" +
		"NONTERMINAL 优先级十二      2021 P12\n" +
		"NONTERMINAL 优先级十一点五  2020 P11_5\n" +
		"NONTERMINAL 优先级十一      2019 P11\n" +
		"NONTERMINAL 优先级十点五    2018 P10_5\n" +
		"NONTERMINAL 优先级十        2017 P10\n" +
		"NONTERMINAL 优先级九点五    2016 P9_5\n" +
		"NONTERMINAL 优先级九        2015 P9\n" +
		"NONTERMINAL 优先级八点五    2014 P8_5\n" +
		"NONTERMINAL 优先级八        2013 P8\n" +
		"NONTERMINAL 优先级七点五    2012 P7_5\n" +
		"NONTERMINAL 优先级七        2011 P7\n" +
		"NONTERMINAL 优先级六点五    2010 P6_5\n" +
		"NONTERMINAL 优先级六        2009 P6\n" +
		"NONTERMINAL 优先级五点五    2008 P5_5\n" +
		"NONTERMINAL 优先级五        2007 P5\n" +
		"NONTERMINAL 优先级四点五    2006 P4_5\n" +
		"NONTERMINAL 优先级四        2005 P4\n" +
		"NONTERMINAL 优先级三点五    2004 P3_5\n" +
		"NONTERMINAL 优先级三        2003 P3\n" +
		"NONTERMINAL 优先级二        2002 P2\n" +
		"NONTERMINAL 优先级一        2001 P1\n" +
		"NONTERMINAL 后置运算符      2029 Suffix_Operator\n" +
		"NONTERMINAL 实际参数表      2030 FUNR\n" +
		"NONTERMINAL 类型            2031 TYPE\n" +
		"NONTERMINAL 类型修饰符      2032 TYPES\n" +
		"NONTERMINAL 指针修饰符      2033 PTRS\n" +
		"NONTERMINAL 关键字修饰符    2034 KWS\n" +
		"NONTERMINAL 函数体          2035 FUNB\n" +
		"NONTERMINAL 语句            2036 STMT\n" +
		"NONTERMINAL 语句块          2037 STMTS\n" +
		"NONTERMINAL 完整语句        2038 FullStatement\n" +
		"NONTERMINAL 标签            2039 Label\n" +
		"NONTERMINAL 表达式语句      2040 EXPS\n" +
		"NONTERMINAL IF语句          2041 IFSTMT\n" +
		"NONTERMINAL WHILE语句       2042 WHILESTMT\n" +
		"NONTERMINAL FOR语句         2043 FORSTMT\n" +
		"NONTERMINAL DO语句          2044 DOSTMT\n" +
		"NONTERMINAL SWITCH语句      2045 SWITCHSTMT\n" +
		"NONTERMINAL GOTO语句        2046 GOTOSTMT\n" +
		"NONTERMINAL RETURN语句      2047 RETURNSTMT\n" +
		"NONTERMINAL BREAK语句       2048 BREAKSTMT\n" +
		"NONTERMINAL CONTINUE语句    2049 CONTINUESTMT\n" +
		"NONTERMINAL ELSE语句        2050 ELSESTMT\n" +
		"NONTERMINAL SWITCH语句块    2051 SWITCHB\n" +
		"NONTERMINAL SWITCH分支      2052 SWITCHS\n" +
		"NONTERMINAL 空语句          2054 BLANK\n" +
		"NONTERMINAL 语句块语句      2055 STMBSTMS\n" +
		"NONTERMINAL IF语句2         2056 IFSTMT2\n" +
		"NONTERMINAL IF语句3         2057 IFSTMT3\n" +
		"TERMINAL 标识符             1000 identifier\n" +
		"TERMINAL =                  1010 assignment\n" +
		"TERMINAL -                  1012 subtraction\n" +
		"TERMINAL +                  1011 addition\n" +
		"TERMINAL *                  1013 multiplication\n" +
		"TERMINAL /                  1014 division\n" +
		"TERMINAL %                  1015 modulo\n" +
		"TERMINAL ++                 1016 increment\n"+
		"TERMINAL --                 1017 decrement\n"+
		"TERMINAL ==                 1018 equal_to\n" +
		"TERMINAL !=                 1019 not_equal_to\n" +
		"TERMINAL >                  1020 greater_than\n" +
		"TERMINAL <                  1021 less_than\n" +
		"TERMINAL >=                 1022 greater_than_or_equal_to\n" +
		"TERMINAL <=                 1023 less_than_or_equal_to\n" +
		"TERMINAL !                  1024 logical_negation\n" +
		"TERMINAL &&                 1025 logical_and\n" +
		"TERMINAL 逻辑或             1026 logical_or\n" +
		"TERMINAL ~                  1027 bitwise_not\n" +
		"TERMINAL &                  1028 bitwise_and\n" +
		"TERMINAL 按位或             1029 bitwise_or\n" +
		"TERMINAL ^                  1030 bitwise_xor\n" +
		"TERMINAL <<                 1031 bitwise_left_shift\n" +
		"TERMINAL >>                 1032 bitwise_right_shift\n" +
		"TERMINAL +=                 1033 addition_assignment\n" +
		"TERMINAL -=                 1034 subtraction_assignment\n" +
		"TERMINAL *=                 1035 multiplication_assignment\n" +
		"TERMINAL /=                 1036 division_assignment\n" +
		"TERMINAL %=                 1037 modulo_assignment\n" +
		"TERMINAL &=                 1038 bitwise_and_assignment\n" +
		"TERMINAL 或等               1039 bitwise_or_assignment\n" +
		"TERMINAL ^=                 1040 bitwise_xor_assignment\n" +
		"TERMINAL <<=                1041 bitwise_left_shift_assignment\n" +
		"TERMINAL >>=                1042 bitwise_right_shift_assignment\n" +
		"TERMINAL [                  1043 left_subscript\n" +
		"TERMINAL ]                  1044 right_subscript\n" +
		"TERMINAL 指针访问成员       1045 structure_dereference\n" +
		"TERMINAL .                  1046 structure_reference\n" +
		"TERMINAL (                  1047 left_parenthesis\n" +
		"TERMINAL )                  1048 right_parenthesis\n" +
		"TERMINAL {                  1049 left_brace\n" +
		"TERMINAL }                  1050 right_brace\n" +
		"TERMINAL ?                  1051 question_mark\n" +
		"TERMINAL :                  1052 colon\n" +
		"TERMINAL ,                  1053 comma\n" +
		"TERMINAL ;                  1054 semicolon\n" +
		"TERMINAL auto               1200 AUTO\n" +
		"TERMINAL break              1201 BREAK\n" +
		"TERMINAL case               1202 CASE\n" +
		"TERMINAL char               1203 CHAR\n" +
		"TERMINAL const              1204 CONST\n" +
		"TERMINAL continue           1205 CONTINUE\n" +
		"TERMINAL default            1206 DEFAULT\n" +
		"TERMINAL do                 1207 DO\n" +
		"TERMINAL double             1208 DOUBLE\n" +
		"TERMINAL else               1209 ELSE\n" +
		"TERMINAL enum               1210 ENUM\n" +
		"TERMINAL extern             1211 EXTERN\n" +
		"TERMINAL float              1212 FLOAT\n" +
		"TERMINAL for                1213 FOR\n" +
		"TERMINAL goto               1214 GOTO\n" +
		"TERMINAL if                 1215 IF\n" +
		"TERMINAL int                1216 INT\n" +
		"TERMINAL long               1217 LONG\n" +
		"TERMINAL register           1218 REGISTER\n" +
		"TERMINAL return             1219 RETURN\n" +
		"TERMINAL short              1220 SHORT\n" +
		"TERMINAL signed             1221 SIGNED\n" +
		"TERMINAL sizeof             1222 SIZEOF\n" +
		"TERMINAL static             1223 STATIC\n" +
		"TERMINAL struct             1224 STRUCT\n" +
		"TERMINAL switch             1225 SWITCH\n" +
		"TERMINAL typedef            1226 TYPEDEF\n" +
		"TERMINAL union              1227 UNION\n" +
		"TERMINAL unsigned           1228 UNSIGNED\n" +
		"TERMINAL void               1229 VOID\n" +
		"TERMINAL volatile           1230 VOLATILE\n" +
		"TERMINAL while              1231 WHILE\n" +
		"TERMINAL 数字               1300 digit\n" +
		"START 函数体\n" +
		
		"函数体 -> 语句 函数体\n" +
		"函数体 -> EMPTY\n" +
		"语句块 -> 语句\n" +
		"语句块 -> { 语句块语句 }\n" +
		"语句块语句 -> 语句 语句块语句\n" +
		"语句块语句 -> EMPTY\n" +
//"完整语句 -> 标签 语句\n" +
//"标签 -> 标识符 :\n" +
//"标签 -> EMPTY\n" +
//"语句 -> 声明语句\n" +
		"语句 -> 表达式语句\n" +
		"语句 -> IF语句\n" +
		"语句 -> WHILE语句\n" +
		"语句 -> FOR语句\n" +
		"语句 -> DO语句\n" +
		"语句 -> SWITCH语句\n" +
		"语句 -> GOTO语句\n" +
		"语句 -> RETURN语句\n" +
		"语句 -> BREAK语句\n" +
		"语句 -> CONTINUE语句\n" +
		"语句 -> 空语句\n" +

		"表达式语句 -> 表达式 ;\n" +	
		"IF语句 -> if ( 表达式 ) 语句块 else 语句块\n" +
		
		"WHILE语句 -> while ( 表达式 ) 语句块\n" +
		"DO语句 -> do 语句块 while ( 表达式 ) ;\n" +
		"FOR语句 -> for ( 表达式 ; 表达式 ; 表达式 ) 语句块\n" +
		"SWITCH语句 -> switch ( 表达式 ) SWITCH语句块\n" +
		"SWITCH语句块 -> { SWITCH分支\n" +
		"SWITCH分支 -> case 表达式 : 函数体 SWITCH分支\n" +
		"SWITCH分支 -> default : 函数体 SWITCH分支\n" +
		"SWITCH分支 -> }\n" +
		"GOTO语句 -> goto 标识符 ;\n" +
		"RETURN语句 -> return 表达式 ;\n" +
		"BREAK语句 -> break ;\n" +
		"CONTINUE语句 -> continue ;\n" +
		"空语句 -> ;\n" +
		
		
		//"类型 -> 类型修饰符 指针修饰符\n" +
		//"类型修饰符 -> 标识符\n" +
		//"类型修饰符 -> 关键字修饰符\n" +
		//"关键字修饰符 -> auto\n" +
		//"关键字修饰符 -> char\n" +
		//"关键字修饰符 -> const\n" +
		//"关键字修饰符 -> double\n" +
		//"关键字修饰符 -> extern\n" +
		//"关键字修饰符 -> float\n" +
		//"关键字修饰符 -> int\n" +
		//"关键字修饰符 -> long\n" +
		//"关键字修饰符 -> register\n" +
		//"关键字修饰符 -> short\n" +
		//"关键字修饰符 -> signed\n" +
		//"关键字修饰符 -> static\n" +
		//"关键字修饰符 -> unsigned\n" +
		//"关键字修饰符 -> void\n" +
		//"关键字修饰符 -> volatile\n" +
		//"指针修饰符 -> * 指针修饰符 | EMPTY\n" +
		
		
		"表达式 -> 优先级十五 优先级十五点五\n" +
		"优先级十五点五 -> , 优先级十五 优先级十五点五\n" +
		"优先级十五点五 -> EMPTY\n" +
		
		"优先级十五 -> 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> = 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> *= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> /= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> %= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> += 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> -= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> <<= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> >>= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> &= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> 或等 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> ^= 优先级十四 优先级十四点五\n" +
		"优先级十四点五 -> EMPTY\n" +
		
		"优先级十四 -> 优先级十三 优先级十三点五\n" +
		"优先级十三点五 -> ? 表达式 : 优先级十三 优先级十三点五\n" +
		"优先级十三点五 -> EMPTY\n" +
		
		"优先级十三 -> 优先级十二 优先级十二点五\n" +
		"优先级十二点五 -> 逻辑或 优先级十二 优先级十二点五\n" +
		"优先级十二点五 -> EMPTY\n" +
		
		"优先级十二 -> 优先级十一 优先级十一点五\n" +
		"优先级十一点五 -> && 优先级十一 优先级十一点五\n" +
		"优先级十一点五 -> EMPTY\n" +
		
		"优先级十一 -> 优先级十 优先级十点五\n" +
		"优先级十点五 -> 按位或 优先级十 优先级十点五\n" +
		"优先级十点五 -> EMPTY\n" +
		
		"优先级十 -> 优先级九 优先级九点五\n" +
		"优先级九点五 -> ^ 优先级九 优先级九点五\n" +
		"优先级九点五 -> EMPTY\n" +
		
		"优先级九 -> 优先级八 优先级八点五\n" +
		"优先级八点五 -> & 优先级八 优先级八点五\n" +
		"优先级八点五 -> EMPTY\n" +
		
		"优先级八 -> 优先级七 优先级七点五\n" +
		"优先级七点五 -> == 优先级七 优先级七点五\n" +
		"优先级七点五 -> != 优先级七 优先级七点五\n" +
		"优先级七点五 -> EMPTY\n" +
		
		"优先级七 -> 优先级六 优先级六点五\n" +
		"优先级六点五 -> < 优先级六 优先级六点五\n" +
		"优先级六点五 -> > 优先级六 优先级六点五\n" +
		"优先级六点五 -> <= 优先级六 优先级六点五\n" +
		"优先级六点五 -> >= 优先级六 优先级六点五\n" +
		"优先级六点五 -> EMPTY\n" +
		
		"优先级六 -> 优先级五 优先级五点五\n" +
		"优先级五点五 -> << 优先级五 优先级五点五\n" +
		"优先级五点五 -> >> 优先级五 优先级五点五\n" +
		"优先级五点五 -> EMPTY\n" +
		
		"优先级五 -> 优先级四 优先级四点五\n" +
		"优先级四点五 -> - 优先级四 优先级四点五\n" +
		"优先级四点五 -> + 优先级四 优先级四点五\n" +
		"优先级四点五 -> EMPTY\n" +
		
		"优先级四 -> 优先级三 优先级三点五\n" +
		"优先级三点五 -> * 优先级三 优先级三点五\n" +
		"优先级三点五 -> / 优先级三 优先级三点五\n" +
		"优先级三点五 -> % 优先级三 优先级三点五\n" +
		"优先级三点五 -> EMPTY\n" +
		
		"优先级三 -> ++ 优先级二\n" +
		"优先级三 -> -- 优先级二\n" +
		"优先级三 -> + 优先级二\n" +
		"优先级三 -> - 优先级二\n" +
		"优先级三 -> ~ 优先级二\n" +
		"优先级三 -> ! 优先级二\n" +
		"优先级三 -> sizeof 优先级二\n" +
		"优先级三 -> * 优先级二\n" +
		"优先级三 -> & 优先级二\n" +
		"优先级三 -> 优先级二\n" +
		"优先级二 -> 优先级一 后置运算符\n" +
		"后置运算符 -> ++\n" +
		"后置运算符 -> --\n" +
		"后置运算符 -> [ 表达式 ]\n" +
		"后置运算符 -> ( 实际参数表 )\n" +
		"后置运算符 -> . 标识符 后置运算符\n" +
		"后置运算符 -> 指针访问成员 标识符 后置运算符\n" +
		"后置运算符 -> EMPTY\n" +
		"实际参数表 -> 表达式\n" +
		"实际参数表 -> EMPTY\n" +
		"优先级一 -> ( 表达式 )\n" +
		"优先级一 -> 标识符\n" +
		"优先级一 -> 数字\n";

	return C;
});