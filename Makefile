src = src/

modules = ${src}requestAnimationFrame.js\
					${src}foreachpolyfill.js\
					${src}math.js\
					${src}dom.js\
					${src}main.js

js:
	java -jar compiler.jar --js ${modules} --js_output_file public/main.min.js
	cat ${modules} > public/main.js
clean:
	rm public/main.min.js public/main.js
