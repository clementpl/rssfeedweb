# Settings
SRC_FOLDER=./src
BUILD_FOLDER=./build
TEST_FOLDER=./test
NM_FOLDER=./node_modules

# Complete build
#all: deps dist buildcss build
all: build compile


# Prepare build folder
build:
	rm -rf $(BUILD_FOLDER)
	mkdir $(BUILD_FOLDER)
	cp $(SRC_FOLDER)/*.html $(BUILD_FOLDER)/
	cp $(SRC_FOLDER)/*.xml $(BUILD_FOLDER)/

# Install dependencies
deps:
	npm install


# Compile CSS
#buildcss:
#	$(NM_FOLDER)/npm-css/bin/npm-css $(SRC_FOLDER)/css/myriad.css > $(BUILD_FOLDER)/myriad.css

# Compile JS
compile:
	$(NM_FOLDER)/browserify/bin/cmd.js $(SRC_FOLDER)/js/main.js -t [ babelify --presets [ es2015 ] ] --debug --s M > $(BUILD_FOLDER)/main.js
	$(NM_FOLDER)/browserify/bin/cmd.js $(SRC_FOLDER)/js/login.js -t [ babelify --presets [ es2015 ] ] --debug --s M > $(BUILD_FOLDER)/login.js
	$(NM_FOLDER)/stylus/bin/stylus $(SRC_FOLDER)/css/main.styl --out $(BUILD_FOLDER)
	$(NM_FOLDER)/stylus/bin/stylus $(SRC_FOLDER)/css/login.styl --out $(BUILD_FOLDER)

# Watch for JS and CSS change
watch:
	$(NM_FOLDER)/stylus/bin/stylus --watch $(SRC_FOLDER)/css/main.styl --out $(BUILD_FOLDER) &
	$(NM_FOLDER)/stylus/bin/stylus --watch $(SRC_FOLDER)/css/login.styl --out $(BUILD_FOLDER) &
	$(NM_FOLDER)/watchify/bin/cmd.js $(SRC_FOLDER)/js/main.js -t [ babelify --presets [ es2015 ] ] --debug --s M -o $(BUILD_FOLDER)/main.js

# Test
#test:
#	$(NM_FOLDER)/browserify/bin/cmd.js --debug $(TEST_FOLDER)/js/*.js > $(TEST_FOLDER)/tests.js


# Clean
clean:
	rm -rf $(BUILD_FOLDER)
#	rm -f $(TEST_FOLDER)/tests.js

# Clean and remake
re: clean all
