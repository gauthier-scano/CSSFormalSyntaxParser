const test = [
		["a"	, "", false],
		["a b"	, "", false],
		
	// Combinator " "
		// Without multiplier
			["a"		, "a"					],
			["a"		, "A"					],	// Case insensitive
			["a"		, "b"			, false ],
			["a"		, "B"			, false ],	// Case insensitive
			["a"		, "a a"			, false ],
			["a a"		, "a"			, false ],
			["a a"		, "a a"					],
			["a b"		, "a"			, false ],
			["a b"		, "a   b"				],
			["a   b"	, "a b"					],	// With Multiple spaces
			["a   b"	, "a    b"				],
			["a b"		, "a		b"			],	// With tab
			["a		b"	, "a b"					],
			["a b"		, "a a a"		, false ],
			["bold test", "bold test"			],
			["bold a"	, "bold test"	, false ],
			["a b"		, "a a b"		, false ],
			["a b"		, "a d"			, false ],
			["a b"		, "a b c"		, false ],
			["a b c"	, "a b c"				],
			["a b c"	, "a b"			, false ],
			["a b a"	, "a b a"				],
			["a b a"	, "a b c"		, false ],
			["a b c"	, "a c b"		, false ],
			["a a a"	, "a a a"				],
		
		// With comment /* */
			["a b c", "a/* comment */b c"			 ],
			["a b c", "a /* comment */ b c"			 ],
			["a b c", "a /* comment */b c"			 ],
			["a b c", "a/* comment */ b c"			 ],
			["a b c", "a/* comment /* */ b c"		 ],
			["a b c", "/* comment */ a b c"			 ],
			["a b c", "a b c /* comment */"			 ],
			["a b c", "a b c /* comment /* */"		 ],
			["a b c", "a b c /* comment */"			 ],
			["a b c", "a b c /* comment*/ */", false ],
			["a b c", "a b c /* <length> */"		 ],
			["a b c", "a b c /* <length> */"		 ],
		
		// With multiplier "?"
			["a? b"		, "a b"				],
			["a b?"		, "a"				],
			["a? b"		, "b"				],
			["a? b"		, "a a b"	 , false],
			["a? a a?"	, "a a a a"	 , false],
			["a? a a?"	, "a a a"			],
			["a? a a?"	, "a a"				],
			["a? a a?"	, "a"				],
			["a? a a? b", "a a b"			],
			["a? a a? b", "a a a a b", false],
			
		// With multiplier "+"
			["a+"		, "a a a"				],
			["a+ b"		, "b"			, false ],
			["a+ b"		, "a b"					],
			["a+ b"		, "a a a b"				],
			["a+ b a+"	, "a a b a"				],
			["a+ b a+"	, "a b a a"				],
			["a+ b a+"	, "a b a a b"	, false ],
			["a+ a a+"	, "a a a"				],
			["a+ a a+"	, "a a a a a"			],
			
		// With multiplier "*"
			["a* b"		, "b"					],
			["a* b"		, "a a b"				],
			["a* b"		, "a2"			, false ],
			["a* a a*"	, "a a a"				],
			["a* a a* b", "a a a b"				],
			["a* a a* b", "a a a b a"	, false ],
			
		// With multiplier "{"
			["a{1} b"			, "b"		 , false],
			["a{1} b"			, "a a b"	 , false],
			["a{1} b"			, "a b"				],
			["a{1,2} b"			, "a a b"			],
			["a{1,2} b"			, "a a a b"	 , false],
			["a{1,3} b{1}"		, "a a a b"			],
			["a{1,3} b{2}"		, "a a a b"	 , false],
			["a{1,3} b{1,2}"	, "a a a b"			],
			["a{1,} b{1,}"		, "a a a b"			],
			["a{1,} b{0,}"		, "a a a"			],
			["a{1,} b{0,}"		, "a a a b"			],
			["a{1,} b{0,}"		, "a a a b b"		],
			["a{1,} b{0,}"		, "a a a b a", false],
			["a{1,} a a{1,}"	, "a a a"			],
			
		// With multiplier "#"
			["a#"				, "a, a"				],
			["a#"				, "a"					],
			["a#"				, "a,"			, false ],
			["a#"				, "a, b"		, false ],
			["a#"				, "b"			, false ],
			["a# b"				, "a b"					],
			["a# b"				, "a, a b"				],
			["a# b"				, "a, a, a b"			],
			["a# b"				, "a a b"		, false ],
			["a b#"				, "a b b"		, false ],
			["a b#"				, "a b, b"				],
			["a# b a#"			, "a, a b a, a"			],
			["a# a a#"			, "a, a a a, a"			],
			["a#{2}"			, "a, a"				],
			["a#{2}"			, "a"			, false ],
			["a#{2}"			, "a, a, a"		, false ],
			["a#{2,}"			, "a, a, a"				],
			["a#{2} b"			, "a, a b"				],
			["a#{2} b"			, "a, a, b"		, false ],
			["a b#{0,} c"		, "a b, b, b c"			],
			["a b#{0,} c"		, "a, b c"		, false ],
			["a b#{0,} c"		, "a b, b c"			],
			["a b#{0,} c"		, "a, a, b"		, false ],
			["a b#{0,} c"		, "a, a, b c"	, false ],
			["a b#{0,} c"		, "a c"					],
			["a{0,} b#{0,} c"	, "a, b c"		, false ],
			["a#{0,} b#{0,} c"	, "a, b c"		, false ],
			["a#{0,} b#{0,} c"	, "a, a b c"			],
			["a#{0,} b{0,} c"	, "a, a b c"			],
			["a#{0,} b{1,} c"	, "a, a b c"			],
			["a#{0,} b c"		, "a, a b c"			],
			["a#{0,} b#{0,} c"	, "a, a b, b c"			],
		
		// With multiple multiplier
			["a? b#{0,} c+"		, "b c"					],
			["a? b#{0,} c+"		, "b"			, false ],
			["a? b#{0,} c+"		, "b, b"		, false ],
			["a? b#{0,} c+"		, "b, b c"				],
			["a? b#{0,} c+"		, "b, b c c"			],
			["a? b#{0,} c+"		, "a b, b c c"			],
			["a? b#{0,} c+"		, "a c c"				],
			["a? a#{0,} a+ a*"	, "a a, a a"			],
			["a? a#{0,} a+ a*"	, "a, a a a a"			],
			["a{1} a#{0,} a+ a*", "a, a a a a"	, false ],
			["a{1} a#{0,} a+ a*", "a a, a a a a"		],
			["a* b a+"			, "a b a"				],
			["a* b a+"			, "b a"					],
			["a* b a+"			, "a b a"				],
			["a* b# a+"			, "a b a"				],
			["a* b# a+"			, "a b, b a"			],
			["a* a? b# a+"		, "a b, b a"			],
			["a* a? b# a+"		, "a a b, b a"			],
			["a* a? b# a+"		, "a a b, b a"			],
			["a* b? c# a+"		, "a c, c a"			],
			["a* b? c# a+"		, "a b c, c a"			],
			["a* b? c# a+"		, "a b b c, c a", false ],
			["a{0,0} b# c+ d*"	, "a b c d"		, false ],
			["a{0,0} b# c+ d*"	, "a b c, c d"	, false ],
			["a{0,0} b# c+ d*"	, "b, b c c d"			],
			["a{0,0} b# c+ d*"	, "b, b d"		, false ],
		
		// With multiplier "$" (non-standard multiplier, for test only)
			["a$ b", "a b"			, false ],
			["a$ b", "a, a b"				],
			["a$ b", "b"			, false ],
			["a$ b", "a, a b"				],
			["a$ b", "a, a, a b"			],
			["a$ b", "a, a, a, a b"	, false ],
		
	// Combinator "&&"
		// Without multiplier
			["a && b"		, "a b"					],
			["a && b"		, "b a"					],
			["a && b && c"	, "b a c"				],
			["a && b && c"	, "b a"			, false ],
			["a && b && c"	, "c b"			, false ],
			["a && b && c"	, "a c"			, false ],
			["a && b && c"	, "a b c a b"	, false ],
			["a && b"		, "b b a"		, false ],
			["a && b"		, "b"			, false ],
			["a && b"		, "a"			, false ],
			
		// With multiplier "?"
			["a? && b"	, "b"			],
			["a? && b"	, "a b"			],
			["a? && b"	, "b a"			],
			["a? && b"	, "b a a", false],
			["a? && b"	, "b a b", false],
			["a? && b"	, "a b a", false],
			["a? && b"	, "b b a", false],
			["a? && b?"	, "a"			],
			["a? && b?"	, "b"			],
			["a? && b?"	, "a b"			],
			["a? && b?"	, "b a"			],
			["a? && b?"	, "b a a", false],
			
		// With multiplier "+"
			["a+ && b"		, "a b"					],
			["a+ && b"		, "a a b"				],
			["a+ && b"		, "a b a"		, false ],
			["a+ && b"		, "a b b"		, false ],
			["a+ && b && a+", "a a b"				],
			["a+ && b && a+", "a a b a a"			],
			["a+ && b && a+", "a a b b a a"	, false	],
			["a+ && b && a+", "b a a a"				],
			["a+ && b && c+", "b a a a"		, false ],
			["a+ && b && c+", "b a c a"		, false ],
			["a+ && b && c+", "b a a c"				],
			
		// With multiplier "*"
			["a* && b"			, "b"					],
			["a* && b"			, "a b"					],
			["a* && b"			, "a a b"				],
			["a* && b"			, "a b b"		, false ],
			["a && b*"			, "b b"			, false ],
			["a && b*"			, "a b b"				],
			["a* && b* && a*"	, "a a b a"				],
			["a* && b* && a*"	, "a a b b a"			],
			["a* && b* && c*"	, "a a b b c"			],
			["a* && b* && c*"	, "a a b b b"			],
			
		// With multiplier "{"
			["a{2} && b"	, "b"		, false ],
			["a{2} && b"	, "a"		, false ],
			["a{2} && b"	, "a a"		, false ],
			["a{2} && b"	, "a a b"			],
			["a{0,2} && b"	, "b"				],
			["a{0,2} && b"	, "a b"				],
			["a{0,2} && b"	, "a a a b"	, false ],
			["a{0,} && b"	, "a a a b"			],
			["a{1,2} && b"	, "b"		, false ],
			["a{1,2} && b"	, "a b"				],
			["a{2,2} && b"	, "a b"		, false ],
			["a{2,2} && b"	, "b a"		, false ],
			["a{2,2} && b"	, "a b a"	, false ],
			["a{2,2} && b"	, "a a b"			],
			["a && b{1,2}"	, "a b a"	, false ],
			["a && b{1,2}"	, "a b b"			],
		
		// With multiplier "#"
			["a# && b"	, "a"		, false ],
			["a# && b"	, "b"		, false ],
			["a# && b"	, "a,"		, false ],
			["a# && b"	, "a, b"	, false ],
			["a# && b"	, "a b"				],
			["a# && b"	, "b a"				],
			["a# && b"	, "b a, a"			],
			["a# && b"	, "a, a b"			],
			["a# && b"	, "b a b"	, false ],
			["a# && b"	, "b a a"	, false ],
			["a# && b"	, "a a b"	, false ],
			["a# && b"	, "b b, a"	, false ],
			["a# && b#"	, "b b, a"	, false	],
			["a# && b#"	, "a, b"	, false	],
			["a# && b#"	, "b, b a,a"		],
			["a# && b#"	, "b b, a,"	, false	],
		
		// With multiple multiplier
			["a? && b && a?"					, "b a"								],
			["a? && b && a?"					, "b a a"							],
			["a? && b && c?"					, "b a c"							],
			["a* && b && a{2}"					, "a a b a a a"						],
			["a* && b && a{2} && c && b{2}"		, "a a b b a a a b c"				],
			["a* && b && a{2} && c && b{2}"		, "a a b b a a a c"			, false ],
			["a* && b && a{2} && c && b{2}"		, "a a b b a a a"			, false ],
			["a# && b && a{2} && c && b{2}"		, "a, a b b c a a b"				],
			["a# && b && a{2} && c && b{2}"		, "a, a b c a a b"			, false ],
			["a# && b+ && a{2} && c && b{2}"	, "a, a b b c a a b b"				],
			["a# && b+ && a{2} && c# && b{2}"	, "a, a b b c a a b b"				],
			["a# && b+ && a{2} && c# && b{2}"	, "a, a b b c, c a a b b"			],
			["a# && b+ && a{2} && c# && b{2}"	, "a, a b b c, c a a b,b"	, false ],
		
	// Combinator "||"
		// Without multiplier
			["a || b"		, "a"				],
			["a || b"		, "b"				],
			["a || b || c"	, "c"				],
			["a || b"		, "b2"		, false ],
			["a || b"		, "b a"				],
			["a || b"		, "b a a"	, false ],
			
		// With multiplier "?"
			["a? || b"	, "a"			],
			["a? || b"	, "b"			],
			["a? || b"	, "a b"			],
			["a? || b"	, "a a b", false],
			["a? || b?"	, "a"			],
			["a? || b?"	, "a b"			],
			["a? || b?"	, "b"			],
			["a? || b?"	, "b a"			],
			["a? || b?"	, "b a a", false],
			
		// With multiplier "+"
			["a+ || b"			, "b a"					],
			["a+ || b"			, "b a a"				],
			["a+ || b"			, "b"					],
			["a || b+"			, "a b"					],
			["a || b+"			, "a b b"				],
			["a || b+"			, "b a b"		, false ],
			["a || b+"			, "a a b"		, false ],
			["a+ || b+ || a+"	, "a a b a a"			],
		
		// With multiplier "*"
			["a* || b", "a"				],
			["a* || b", "b"				],
			["a* || b", "a a"			],
			["a* || b", "a a b"			],
			["a* || b", "b a"			],
			["a* || b", "b a a"			],
			["a* || b", "b b"	, false ],
			
		// With multiplier "{"
			["a{2} || b"		, "b"					],
			["a{2} || b"		, "a"			, false	],
			["a{2} || b"		, "a a"					],
			["a{1,2} || b"		, "b"					],
			["a{1,2} || b"		, "b a"					],
			["a{1,2} || b"		, "b a a"				],
			["a{1,2} || b"		, "b a a a"		, false	],
			["a{1,} || b"		, "b a a a a"			],
			["a{2} || b{2}"		, "a a"					],
			["a{2} || b{2}"		, "b b"					],
			["a{2} || b{2}"		, "b b a a"				],
		
		// With multiplier "#"
			["a# || b"		, "b"					],
			["a# || b"		, "b,"			, false ],
			["a# || b"		, "a,"			, false ],
			["a# || b"		, "a"					],
			["a# || b"		, "b a"					],
			["a# || b b"	, "b a b"		, false ],
			["a# || b"		, "b a b"		, false ],
			["a# || b"		, "b a, a"				],
			["a# || b"		, "a, a b"				],
			["a# || b"		, "a , a b"				],
			["a# || b"		, "b a, a, a"			],
			["a# || b"		, "a, a, a b"			],
			["a# || b"		, "b a a"		, false ],
			["a# || b"		, "a a b"		, false ],
			["a# || b"		, "a, a"				],
			["a# || b"		, "a a"			, false ],
			["a# || b || c"	, "a c"					],
			["a# || b || c"	, "c"					],
			["a# || b || c"	, "c b"					],
			["a# || b || c"	, "c d"			, false ],
			["a# || b || c"	, "c a d"		, false ],
			["a# || b || c"	, "c a, a d"	, false ],
			["a# || b || c"	, "c a, a b"			],
			
		// With multiple multiplier
			["a{2} || b? || c{2,3}"		, "a"					, false ],
			["a{2} || b? || c{2,3}"		, "a a"							],
			["a{2} || b? || c{2,3}"		, "a a b"						],
			["a{2} || b? || c{2,3}"		, "c c"							],
			["a{2} || b? || c{2,3}"		, "c c a"				, false ],
			["a# || b? || c{2,3} || a+"	, "b a, a a a"					],
			["a# || b? || c{2,3} || a+"	, "b a, a c a"			, false ],
			["a# || b? || c{2,3} || a+"	, "b a, a c c"					],
			["a# || b? || c{1,3} || a+"	, "b a, a a a c"				],
			["a# || b? || c{1,3} || a+"	, "b a, a a a c"				],
			["a# || b? || c{1,3} || a+"	, "b a, a a a c c c"			],
			["a# || b? || c{1,3} || a+"	, "b a, a a a c c c c"	, false ],
			["a# || b? || c{1,3} || a+"	, "c c a a a, a, a b"			],
			["a# || b? || c{1,3} || a+"	, "c c a, a, a, a, a b"			],
			
	// Combinator "|"
		// Without multiplier
			["a|b"			, "a"			],
			["a | b"		, "a"			],
			["a | b"		, "b"			],
			["a | b | c"	, "b"			],
			["a | b | c"	, "c"			],
			["a | b | c"	, "a c"	, false ],
			["a | b"		, "a b"	, false ],
			["a | b"		, "b a"	, false ],
			["a | b"		, "b"			],
			["a | b"		, "b2"	, false ],
			["a? | b"		, "a b"	, false ],
			
		// With multiplier "?"
			["a? | b"	, "b"				],
			["a? | b?"	, "a"				],
			["a? | b?"	, "b"				],
			["a? | b?"	, "c"		, false	],
			["a+ | b"	, "b"				],
			["a+ | b"	, "a"				],
			["a+ | b"	, "a a"				],
			["a+ | b"	, "a a b"	, false ],
			
		// With multiplier "+"
			["a | b+"	, "a"				],
			["a | b+"	, "b"				],
			["a | b+"	, "b b"				],
			["a | b+"	, "b b a"	, false ],
			["a+ | b+"	, "a a a"			],
			["a+ | b+"	, "a a b"	, false ],
		
		// With multiplier "*"
			["a* | b", "b"				],
			["a* | b", "a"				],
			["a* | b", "a a"			],
			["a* | b", "a a b"	, false	],
			["a* | b", "b2"		, false	],
			["a | b*", "a"				],
			["a | b*", "b"				],
			["a | b*", "b b a"	, false	],
			["a | b*", "b2"		, false	],
			
		// With multiplier "{"
			["a{1} | b"		, "b"				],
			["a{2} | b"		, "a"		, false ],
			["a{2} | b"		, "a a"				],
			["a{2} | b"		, "a a b"	, false ],
			["a{2} | b{1}"	, "a a b"	, false ],
			["a{2} | b{1}"	, "b"				],
			["a{2} | b{1}"	, "b b"		, false ],
			["a{2,3} | b"	, "a"		, false ],
			["a{2,3} | b"	, "a a"				],
			["a{2,3} | b"	, "a a a"			],
			["a{2,3} | b"	, "a a a a"	, false ],
			["a{2,} | b"	, "a a a a"			],
			
		// With multiplier "#"
			["a | b#"		, "b,"			, false ],
			["a# | b"		, "b"					],
			["a# | b"		, "a"					],
			["a# | b"		, "a,"			, false ],
			["a# | b"		, "a, b"		, false ],
			["a# | b"		, "b, a"		, false ],
			["a# | b"		, "a, a"				],
			["a# | b"		, "a a"			, false ],
			["a# | b"		, "b, b"		, false ],
			["a | b#"		, "a"					],
			["a | b#"		, "b"					],
			["a | b#"		, "b, b"				],
			["a | b#"		, "b  ,  b"				],
			["a | b#"		, "b, b a"		, false ],
			["a | b# | c"	, "c"					],
			["a | b# | c"	, "b, b"				],
			["a | b# | c"	, "b, b c"		, false ],
			["a | b# | c"	, "b, b c a"	, false ],
			["a | b# | c"	, "b, a c b"	, false ],
			["a b# | c d"	, "a b, b d"	, false ],
			["a [b# | c] d"	, "a b, b d"			],
		
		// With multiple multiplier
			["a{1} | b | a{2,3}"	, "a"				],
			["a{1} | b | a{2,3}"	, "b"				],
			["a{1} | b | a{2,3}"	, "a a"				],
			["a{1} | b | a{2,3}"	, "a a a"			],
			["a{1} | b | a{2,3}"	, "a a a b"	, false ],
			["a{1} | b# | a{2,3}"	, "b, b, b"			],
			["a{1} | b# | a{2,3}"	, "a, a"	, false ],
			["a{1} | b# | a{2,3}"	, "b, b"			],
			["a{1} | b# | a? c"		, "c"				],
		
	// Combinator "["
		// Without multiplier
			["a [b c]"				, "a"				, false ],
			["a [b c]"				, "a b"				, false ],
			["a [b c]"				, "a b c"					],
			["a b [c [e [f f]] g] d", "a a"				, false ],
			["a b [c [e [f f]] g] d", "a b c e f f g d"			],
			["a  b [[[d]]]"			, "a a"				, false ],
			["a  b [[[d]]]"			, "a a"				, false ],
			["[ a b ]"				, "a b"						],
			["[  a  b  ]"			, "a b"						],
			[" [  a  b  ] "			, "a b"						],
			[" [  a  b  ]"			, "a c"				, false ],
			["[[[ a b ]]]"			, "a b"						],
			["[[[ a b ]]]"			, "a c"				, false ],
			["[[[ a b ]]]"			, "a b c"			, false ],
			["[[[ a b ]]] c"		, "a b c"					],
			["[[[ a b ]]] c"		, "a b"				, false ],
			["a [[[ b c ]]]"		, "a b c"					],
			["a [[[ b c ]]]"		, "a b c d"			, false ],
			["a [[[ b c ]]] d"		, "a b c d"					],
			
		// With multiplier "?"
			["a [b c]? d", "a b c d"],
			["a [b c]? d", "a d"					],
			["a [b c]? d", "a b d"			, false ],
			["a [b c]? d", "a c d"			, false ],
			["a [b c]? d", "a b c c"		, false ],
			["a [b c]? d", "a b c b c d"	, false ],
			
		// With multiplier "+"
			["a [b c]+ d", "a b c b c d"		],
			["a [b c]+ d", "a d"		, false ],
		
		// With multiplier "*"
			["a [b c]* d", "a d"					],
			["a [b c]* d", "a b c b c d"			],
			["a [b c]* d", "a b c b d"		, false ],
			
		// With multiplier "{"
			["a [b c]{2} d"		, "a b c b c d"						],
			["a [b c]{2} d"		, "a b c d"					, false ],
			["a [b c]{2,} d"	, "a b c b c b c d"					],
			["a [b c]{2,} d"	, "a b c d"					, false ],
			["a [b c]{2,4} d"	, "a b c b c b c d"					],
			["a [b c]{2,4} d"	, "a b c b c b c b c b c d"	, false ],
			
		// With multiplier "#"
			["[a b]#", "a b"					],
			["[a b]#", "a b, a b"				],
			["[a b]#", "a b, a b, a b"			],
			["[a b]#", "a b a b"		, false ],
			
		// With special char "!"
			["a [a? && b?]"			, "a"				],
			["a [a? && b?]!"		, "a"		, false ],
			["a [a? && b?]!"		, "a b"				],
			["a [a? && b?]!"		, "a c"		, false ],
			["a [a? && b?]!"		, "a a b"			],
			["a [[a? && b?] c?]!"	, "a"				],
			["a [[a? && b] c?]!"	, "a"		, false ],
			["a [[a? && b] c?]"		, "a"		, false ],
			["a [[a? && b] c?]!"	, "a b"				],
			["a [[a? && b] c?]!"	, "a a b"			],
		
	// Combinator "<"
		// Without multiplier
			["<length>"			, "1px"				],
			["<length>"			, ".5em"			],
			["<length>"			, ".px"		, false ],
			["<length> <length>", "1px 3px"			],
			["<length> <length>", "1px3px"	, false ],
			["<length> <length>", "1px 3p"	, false ],
			
		// With multiplier "?"
			["<number>?", "1 1 1", false],
		
		// With multiplier "+"
			["<number>+", "1 1"				],
			["<number>+", ""		, false ],
			["<number>+", "1 1, 1"	, false ],
			
		// With multiplier "*"
			["<number>*", "1 1 1"],
		
		// With multiplier "#"
			["<number>#", "1, 1"		],
			["<number>#", "1 1"	, false	],
		
	// Combining combinator
		["a || [b || c]#"	, "a b c, b c"		],
		["a || [b || c]# d"	, "a b c, b c d"	],
		["a || [b && c]# d"	, "a b c, b c d"	],
		["a || [b && c]# d"	, "a c b, c b d"	],
		["a || [b && c]# d"	, "a b c, c b d"	],
		["a || [b && c]# d"	, "a c b, b c d"	],
		["a || [b | c]# d"	, "a c, c d"		],
		["a || [b | c]# d"	, "a c, b d"		],
		
		["a b && c"			, "c"		, false ],
		["a b && c"			, "a b"		, false ],
		["a b && c"			, "a b c"			],
		["a b && c"			, "c a b"			],
		["c && a b"			, "c a b"			],
		["c && a b"			, "a b c"			],
		["c && a b"			, "a b c d"	, false ],
		["c && [a b] && d"	, "a b c d"			],
		["a || [b c] || d"	, "a b c"			],
		["a || [b c] || d"	, "a b c d"			],
		["a || [b c] || d"	, "a d"				],
		["[a || [b c]] || d", "a d"				],
		["[a || [b c]] || d", "b c"				],
		["[a || [b c]] || d", "a b c"			],
		["[a || [b c]] || d", "b c d"			],
		["[a || [b c]] || d", "a b c d"			],
		["[a || [b c]] || d", "a e d"	, false ],
		["a || [b c] || d"	, "a b"		, false ],
		["a || [b c] || d"	, "b c"				],
		["a b | c"			, "a b"				],
		["a b | c"			, "c"				],
		["a b | c"			, "a"		, false ],
		["a b | c+"			, "c c"				],
		["a b | c#"			, "c, c"			],
		["a b | c#"			, "c,c"				],
		["a b | c#"			, "c c"		, false ],
		["a b | c d"		, "a b"				],
		["a b | c d"		, "c d"				],
		["a b | c d"		, "a d"		, false ],
		["a b | c d"		, "b c"		, false ],
		["a b | c d"		, "a b c"	, false ],
		["a b | c# d"		, "c, c d"			],
		["a b | c# d"		, "c d"				],
		["a [b | c] | d"	, "d"				],
		["a [b | c] | d"	, "a b"				],
		["a [b | c] | d"	, "a c"				],
		["a [b | c] | d"	, "a d"		, false ],
		["[a [b | c]] | d"	, "a d"		, false ],
		["[a [b | c]] | d"	, "a b"				],
		["[a [b | c]] | d"	, "d"				],
		["[a [b | c]] | d"	, "a c"				],
		["[a [b | c]] | d"	, "c d"		, false ],
		["[a? && b && c] a"	, "a b c a"			],
		["[a? && b && c] a"	, "b c a"			],
		["[a? && b && c] a"	, "a b c"	, false ],
		["[a? && b && c] a"	, "a c b"	, false ],
		["[a? && b && c] a"	, "a c b a"			],
		
	// Testing special char ",", "/", "(", ")"
		["\\*"				, "*"							],	// Escaping reserved char
		["\\*h/"			, "*h/"							],
		["a, b"				, "a, b"						],
		["a, b"				, "a  ,   b"					],
		["a / b"			, "a / b"						],
		["a/b"				, "a / b"						],
		["a /b"				, "a / b"						],
		["a/ b"				, "a / b"						],
		["a / b"			, "a/b"							],
		["a / b"			, "a /b"						],
		["a / b"			, "a/ b"						],
		["a , b / c"		, "a , b / c"					],
		["a , b / c"		, "a b / c"				, false ],
		["a , b / c"		, "a , b c"				, false ],
		["a#, b / c"		, "a, a, b / c"					],
		["a#, b / c"		, "A, a, B / C"					],
		["a#, b# / c"		, "a, a, b / c"					],
		["a#, b# / c"		, "a, a, b, b / c"				],
		["a#,, b#,, c,,"	, "a, a,, b, b,, c,,"			],
		["(()())"			, "(()())"						],
		["a ()()()((()))"	, "a ()()()((()))"				],
		["a ()()() b ((()))", "a ()()() b ((()))"			],
		
	// Testing Basic Data Type
		["<br-width>", "thin"			],
		["<br-width>", "medium"			],
		["<br-width>", "thick"			],
		["<br-width>", "thicked", false ],
		["<br-width>", "10"		, false ],
		["<br-width>", "10 px"	, false ],
		["<br-width>", "10px"			],
		["<br-width>", "10em"			],
		["<br-style>", "none"			],
		["<br-style>", "hidden"			],
		["<br-style>", "dotted"			],
		["<br-style>", "dott"	, false ],
		
		["<box>", "border-box"					],
		["<box>", "padding-box"					],
		["<box>", "content-box"					],
		["<box>", "inherit"		, false		 	],
		
		["<fill-rule>", "nonzero"		 ],
		["<fill-rule>", "evenodd"		 ],
		["<fill-rule>", "inherit", false ],
		
		["<side-or-corner>", "left top"			],
		["<side-or-corner>", "top left"			],
		["<side-or-corner>", "left right", false],
		
		["<percentage>", "10%"			],
		["<percentage>", ".5%"			],
		["<percentage>", ".%"	, false ],
		
		["<number>", "1"				],
		["<number>", "+1"				],
		["<number>", "-1"				],
		["<number>", "1."		, false ],
		["<number>", "+1."		, false ],
		["<number>", "-1."		, false ],
		["<number>", ".5"				],
		["<number>", "+.5"				],
		["<number>", "-.5"				],
		["<number>", "+1.5e2"			],
		["<number>", "+1.5e+2"			],
		["<number>", "+1.5e-2"			],
		["<number>", "10.50"			],
		["<number>", "10"				],
		["<number>", "1a0"		, false ],
		["<number>", "text"		, false ],
		
		// Using range notation [min,max]
		["<number[0,10]>"		, "1"			],
		["<number[0 , 10]>"		, "1"			],
		["<number[+0 , +10]>"	, "1"			],
		["<number[-10 , 0]>"	, "-1"			],
		["<number[ -10 , -0 ]>"	, "-1"			],
		["<number[0,10]>"		, "11"	, false	],
		["<number[0,10]>"		, "-1"	, false	],
		["<number[0,10]>"		, "-1"	, false	],
		["<number[0,+∞]>"		, "-1"	, false	],
		["<number[0,+∞]>"		, "500"			],
		["<number[-∞,0]>"		, "-2"			],
		["<number[-∞,0]>"		, "2"	, false	],
		["<number[-∞,∞]>"		, "2"			],
		["<number[-∞,∞]>"		, "2"			],
		["<number[-∞,+∞]>"		, "2"			],
		["<number[-∞,-∞]>"		, "2"	, false	],
		["<number[1.2,1.5]>"	, "1.2"			],
		["<number[1.2,1.5]>"	, "1.1"	, false	],
		["<number[1.2,1.5]>"	, "1.5"			],
		["<number[1.2,1.5]>"	, "1.6"	, false	],
		["<number[+1.2,+1.5]>"	, "1.6"	, false	],
		["<number[-1.02,+1.5]>"	, "1"			],
		["<number[-1.02,+1.5]>"	, "-2"	, false	],
		
		["<angle>", "1deg"				],
		["<angle>", ".5deg"				],
		["<angle>", ".55deg"			],
		["<angle>", "1.deg"		, false ],
		["<angle>", "1.5deg"			],
		["<angle>", "12.5deg"			],
		["<angle>", "12.55deg"			],
		["<angle>", "12..55deg"	, false ],
		["<angle>", "1rad"				],
		["<angle>", "1grad"				],
		["<angle>", "1turn"				],
		["<angle>", "turn"		, false ],
		["<angle>", "123"		, false ],
		
		["<ratio>", "1"			, false ],
		["<ratio>", "1 2"		, false ],
		["<ratio>", "1 / 2"				],
		["<ratio>", "+1 / -2"			],
		["<ratio>", "1/2"				],
		["<ratio>", "-1/+2"				],
		["<ratio>", "-1 +2"		, false ],
		
		["<string>", "abcd"		, false ],
		["<string>", "'abcd"	, false ],
		["<string>", "'abcd'"			],
		["<string>", '"abcd"'			],
		["<string>", '"abcd'	, false ],
		
		["<hash-token>", "abcd"		, false ],
		["<hash-token>", "#abcd"			],
		["<hash-token>", "#abcd新道", false ],
		["<hash-token>", "#aBCd_-19"		],
		["<hash-token>", "#äÄiÜ"			],
		
		["<dashed-ident>", "--e_x-aMPle"		],
		["<dashed-ident>", "--test@test", false	],
		["<dashed-ident>", "-test"		, false	],
		
		["<url>", "url()"					],
		["<url>", "url())"			, false ],
		["<url>", "url(file.png)"			],
		["<url>", "url('file.png')"			],
		["<url>", 'url("file.png")'			],
		["<url>", 'url(file.png")'	, false ],
		["<url>", "url('file.png)"	, false ],
		
		["<color-stop-list>", "red"										, false ],
		["<color-stop-list>", "red 10px"								, false ],
		["<color-stop-list>", "red 5%"									, false ],
		["<color-stop-list>", "red, #fff"										],
		["<color-stop-list>", "red 10px, #fff"									],
		["<color-stop-list>", "red 10px, #fff 5%"								],
		["<color-stop-list>", "red 10px, #fff 5%, rgb(25, 50, 75) 5em"			],
		["<color-stop-list>", "10px red, #fff 5%, rgb(25, 50, 75) 5em"	, false ],
		
		["<font-weight-absolute>", "normal"			],
		["<font-weight-absolute>", "bold"			],
		["<font-weight-absolute>", "300"			],
		["<font-weight-absolute>", "600"			],
		["<font-weight-absolute>", "600px"	, false ],
		
		["<color>", "#eee"								],
		["<color>", "#eeee"								],
		["<color>", "#eeeee"					, false ],
		["<color>", "#eeeeee"							],
		["<color>", "#eeeeeee"					, false	],
		["<color>", "#eeeeeeee"							],
		["<color>", "currentcolor"						],
		["<color>", "red"								],
		["<color>", "black"								],
		["<color>", "transparent"						],
		["<color>", "rgb(150, 150, 150)"				],
		["<color>", "rgba(150, 150, 150, 0.5)"			],
		["<color>", "rgba(150 150 150 / 0.5)"			],
		["<color>", "rgba(150 150 150 // 0.5)"	, false	],
		["<color>", "hsl(120, 50%, 20%)"				],
		["<color>", "hsl(120 50% 20%)"					],
		["<color>", "hsl(120deg 50% 20%)"				],
		["<color>", "hsla(240, 50%, 20%, 0.05)"			],
		["<color>", "hsla(120deg 50% 20% / 5%)"			],
		
		["<circle()>", "circle()"							],
		["<circle()>", "circle(closest-side)"				],
		["<circle()>", "circle(closest-side at top)"		],
		["<circle()>", "circle(at left)"					],
		["<circle()>", "circle(at closest-side top)", false	],
		
		["<blur()>", "blur(10px)"			],
		["<blur()>", "blur(5%)"		, false	],
		["<blur()>", "blur(5)"	 	, false ],
		
		["<attr()>", "attr(data-test)"				 	],
		["<attr()>", "attr(data-test fallback)"	, false ],
		
		["<shape-radius>", "closest-side"			],
		["<shape-radius>", "farthest-side"			],
		["<shape-radius>", "10px"					],
		["<shape-radius>", "5"				, false ],
		
		["<shadow>", "1px 2px red"],
		["<shadow>", "1px 2px red inset"],
		["<shadow>", "1px 2px 3px red"],
		["<shadow>", "1px 2px 3px 4px red"],
		["<shadow>", "1px 2px 3px 4px 5px red", false],
		["<shadow>", "1px 2px 3px 4px red red", false],
	
	// Testing CSS prperties
		"ENABLE COMMON",
		
		["<'all'>", "revert"			],
		["<'all'>", "inherit"			],
		["<'all'>", "initial"			],
		["<'all'>", "unset"				],
		["<'all'>", "other"		, false ],
		
		["<'animation'>", "3s slidein"],
		["<'animation'>", "3s linear 1s slidein"],
		["<'animation'>", "3s ease-in 1s 2 reverse both paused slideint"],
		
		["<'border-collapse'>", "collapse"			],
		["<'border-collapse'>", "separate"			],
		["<'border-collapse'>", "inherit"			],
		["<'border-collapse'>", "initial"			],
		["<'border-collapse'>", "unset"				],
		["<'border-collapse'>", "other"		, false ],
		
		["<'box-shadow'>", "none"						],
		["<'box-shadow'>", "inherit"					],
		["<'box-shadow'>", "initial"					],
		["<'box-shadow'>", "unset"						],
		["<'box-shadow'>", "other"				, false ],
		["<'box-shadow'>", "1px 2px red"				],
		["<'box-shadow'>", "1px 2px red"				],
		["<'box-shadow'>", "red 1px 2px"				],
		["<'box-shadow'>", "red 1px 2px inset"			],
		["<'box-shadow'>", "inset red 1px 2px"			],
		["<'box-shadow'>", "inset r ed 1px 2px"	, false	],
		
		["<'direction'>", "ltr"				],
		["<'direction'>", "rtl"				],
		["<'direction'>", "inherit"			],
		["<'direction'>", "initial"			],
		["<'direction'>", "unset"			],
		["<'direction'>", "other"	, false ],
		
		["<'empty-cells'>", "show"				],
		["<'empty-cells'>", "hide"				],
		["<'empty-cells'>", "inherit"			],
		["<'empty-cells'>", "initial"			],
		["<'empty-cells'>", "unset"				],
		["<'empty-cells'>", "other"		, false ],
		
		["<'font-weight'>", "bolder"			],
		["<'font-weight'>", "lighter"			],
		["<'font-weight'>", "600"				],
		["<'font-weight'>", "inherit"			],
		["<'font-weight'>", "initial"			],
		["<'font-weight'>", "unset"				],
		["<'font-weight'>", "other"		, false ],
		
		["<'flex-wrap'>", "nowrap"				],
		["<'flex-wrap'>", "wrap"				],
		["<'flex-wrap'>", "wrap-reverse"		],
		["<'flex-wrap'>", "inherit"				],
		["<'flex-wrap'>", "initial"				],
		["<'flex-wrap'>", "unset"				],
		["<'flex-wrap'>", "other"		, false ],
		
		["<'flex-direction'>", "row"					],
		["<'flex-direction'>", "row-reverse"			],
		["<'flex-direction'>", "column"					],
		["<'flex-direction'>", "column-reverse"			],
		["<'flex-direction'>", "inherit"				],
		["<'flex-direction'>", "initial"				],
		["<'flex-direction'>", "unset"					],
		["<'flex-direction'>", "other"			, false ],
		
		["<'hyphens'>", "none"				],
		["<'hyphens'>", "manual"			],
		["<'hyphens'>", "auto"				],
		["<'hyphens'>", "inherit"			],
		["<'hyphens'>", "initial"			],
		["<'hyphens'>", "unset"				],
		["<'hyphens'>", "other"		, false ],
		
		["<'isolation'>", "auto"			],
		["<'isolation'>", "isolate"			],
		["<'isolation'>", "inherit"			],
		["<'isolation'>", "initial"			],
		["<'isolation'>", "unset"			],
		["<'isolation'>", "other"	, false ],
		
		["<'object-fit'>", "fill"				],
		["<'object-fit'>", "contain"			],
		["<'object-fit'>", "cover"				],
		["<'object-fit'>", "none"				],
		["<'object-fit'>", "scale-down"			],
		["<'object-fit'>", "inherit"			],
		["<'object-fit'>", "initial"			],
		["<'object-fit'>", "unset"				],
		["<'object-fit'>", "other"		, false ],
		
		["<'top'>", "150px"				],
		["<'top'>", "150px 8%"	, false	],
		["<'top'>", "10%"				],
		["<'top'>", "1.5%"				],
		["<'top'>", ".5%"				],
		["<'top'>", "auto"				],
		["<'top'>", "150p"		, false ],
		
		["<'top'> <'bottom'>", "150px .5px"			],
		["<'top'> <'bottom'>", "150px 5.px"	, false	],
		["<'top'> <'bottom'>", "5% 1.5px"			],
		["<'top'> <'bottom'>", "auto 1.5px"			],
		["<'top'> <'bottom'>", "1.5px auto"			],
		
		["<'border'>", "1px solid red"],
		["<'border'>", "solid 1px red"],
		["<'border'>", "red solid 1px"],
		
		["<'border-color'>", "#eee"],
		["<'border-color'>", "#eee red"],
		["<'border-color'>", "#eee red currentcolor"],
		["<'border-color'>", "#eee red rgb(150,150,150) currentcolor"],
		
		["<'margin'>", "1px"						],
		["<'margin'>", "1px 2%"						],
		["<'margin'>", "1px 2% 3em"					],
		["<'margin'>", "1px 2% 3em 4ex"				],
		["<'margin'>", "1px 2% 3em auto"			],
		["<'margin'>", "1px 2% 3em 4ex 4pt"	, false ],
		["<'margin'>", "inherit"					],
		["<'margin'>", "other"				, false ],
		
		["<'top'>", "1px"				],
		["<'top'>", "5%"				],
		["<'top'>", "auto"				],
		["<'top'>", "inherit"			],
		["<'top'>", "other"		, false ],
		
		["matrix(<number> [, <number>]{5,5})"	, "matrix(1,1,1,1,1,1)"			],
		["<matrix()>"							, "matrix(1,1,1,1,1,1)"			],
		["<matrix()>"							, "matrix(1,1,1,1)"		, false ],
		
		["<'transform'>", "scale(1.01) translateX(15px) rotateZ(50deg)"],
		["<'transform'>", "RotaTE(10deg)"],
		["<'transform'>", "scale3d(10, 10, 10)"],
		
		["<'display'>", "flex"				],
		["<'display'>", "flex-block", false ],
		["<'display'>", "unset"				],
		
		["<'flex-wrap'>", "wrap"				],
		["<'flex-wrap'>", "nowrap"				],
		["<'flex-wrap'>", "wrap-reverse"		],
		["<'flex-wrap'>", "inherit"				],
		["<'flex-wrap'>", "10px"		, false	],
		
		["<'grid-auto-flow'>", "row"					],
		["<'grid-auto-flow'>", "column"					],
		["<'grid-auto-flow'>", "dense"					],
		["<'grid-auto-flow'>", "row dense"				],
		["<'grid-auto-flow'>", "column dense"			],
		["<'grid-auto-flow'>", "column row"		, false ],
		["<'grid-auto-flow'>", "inherit"				],
		
		["<'width'>", "10px"],
		["<'width'>", "10%"],
		["<'width'>", "auto"],
		["<'width'>", "min-content"],
		["<'width'>", "max-content"],
		["<'width'>", "fit-content(10%)"],
		["<'width'>", "magical", false],
		["<'width'>", "inherit"],
		
		["<'grid-template-areas'>", "none"],
		["<'grid-template-areas'>", "'area1'"],
		["<'grid-template-areas'>", "'area1' 'area2'"]
];

D("#button").onClick(async function() {
	function wait(delay) {
		return new Promise(resolve => setTimeout(() => resolve(), delay));
	};
	
	let commonProperty = false;
	for(let i = 0, length = test.length; i < length; i++) {
		if(test[i] == "ENABLE COMMON") {
			commonProperty = true;
			i++;
		}
		
		const start = performance.now();
		
		const parser 	 = new CSSFormalSyntaxParser(test[i][0], commonProperty);
		const parserTest = parser.test(test[i][1]);
		
		console.log("--- Test n° " + i + " with syntax '" + test[i][0] + "' and value '" + test[i][1] + "' (common properties " + (test[i][3] ? "disabled" : "enabled") + ") returned " + parserTest.valid + " and has to be " + !(test[i][2] === false) + ". Valid: " + (parserTest.valid == !(test[i][2] === false)) + ". [" + (performance.now() - start) + "ms]");
		console.log("Parser: ", parser);
		console.log("Test: ", parserTest);
		
		if(parserTest.valid != !(test[i][2] === false)) {
			console.log("Error on:", test[i]);
			
			throw new Error("Error in test n°" + i + ":");
		}
		
		await wait(10);
	}

	console.log("----- ALL TESTS PASSED (" + test.length + " done) -----");
});

CSSFormalSyntaxParser.prototype.multiplier["$"] = function(syntaxObjt, syntaxStringObjt) {
	syntaxStringObjt.quantity = [2, 3, ","];
};

function D(id) {
	return document.getElementById(id.replace("#", ""));
};

const 	result = D("#result"),
		overflow = D("#overflow"),
		missing = D("#missing"),
		proposal = D("#proposal");
let 	parser = null;

const select = D("#select").onChange(() => {
	const value = select.getVal();
	
	if(value) {
		parser = new CSSFormalSyntaxParser(value);
		input.setVal();
	}
});

const input = D("#input").onBlur(() => {
	select.setVal();
	
	const value = input.getVal();
	
	if(value) {
		parser = new CSSFormalSyntaxParser(value);
		select.setVal();
	}
});

const value = D("#value").onInput(() => {
	const parse = parser.test(value.getVal());
	
	result.setContent(parse.valid);
	overflow.setContent(parse.overflow);
	missing.setContent(parse.missingValue);
	proposal.setContent(parse.proposal);
	
	console.log(parse);
});

select.createChild({
	tagName : "option",
	textContent : "-- Basic data types --",
	disabled : true
});

for(let z in CSSFormalSyntaxParser.prototype.basicDataType) {
	if(CSSFormalSyntaxParser.prototype.basicDataType.hasOwnProperty(z)) {
		select.createChild({
			tagName : "option",
			textContent : z,
			value : "<" + z + ">"
		});
	}
}

select.createChild({
	tagName : "option",
	textContent : "-- CSS Properties --",
	disabled : true
});

for(let z in CSSFormalSyntaxParser.prototype.property) {
	if(CSSFormalSyntaxParser.prototype.property.hasOwnProperty(z)) {
		select.createChild({
			tagName : "option",
			textContent : z,
			value : "<'" + z + "'>"
		});
		
	//	new CSSFormalSyntaxParser("<'" + z + "'>");
	}
}

if(input.getVal()) {
	parser = new CSSFormalSyntaxParser(input.getVal());
	
	console.log(parser);
}
