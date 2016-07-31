UPSTREAM := git@github.com:bocoup-education/speaking-nix.git
OUTDIR := out

.PHONY: build
build: node_modules | $(OUTDIR)

$(OUTDIR): src/assets/* src/material/**/*
	node build

node_modules: package.json
	npm install

$(OUTDIR)/.git:
	cd $(OUTDIR); \
		git init; \
		git remote add upstream null; \
		git checkout --orphan gh-pages; \
		git commit --allow-empty --message 'empty'

.PHONY: deploy
deploy: build $(OUTDIR)/.git
	git rev-parse HEAD > $(OUTDIR)/version.txt
	cd $(OUTDIR)/web; \
		git remote set-url upstream $(UPSTREAM); \
		git add --all .; \
		git commit --amend --message 'Build site';\
		git push --force upstream gh-pages

.PHONY: clean
clean:
	rm -rf $(OUTDIR)
