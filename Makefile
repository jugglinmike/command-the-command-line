UPSTREAM := git@github.com:bocoup-education/command-the-command-line.git
OUTDIR := out
OUTDIR_WEB = $(OUTDIR)/web

.PHONY: build
build: node_modules | $(OUTDIR)

$(OUTDIR): src/assets/* src/material/**/*
	node build

node_modules: package.json
	npm install

$(OUTDIR_WEB)/.git:
	cd $(OUTDIR_WEB); \
		git init; \
		git remote add upstream null; \
		git checkout --orphan gh-pages; \
		git commit --allow-empty --message 'empty'

$(OUTDIR)/command-the-command-line.box:
	cd src/environment && \
		vagrant up && \
		vagrant ssh -c '/mnt/vagrant/prep-for-packaging.sh' && \
		vagrant package \
			--vagrantfile Vagrantfile-packaged \
			--output ../../$@

.PHONY: deploy
deploy: build $(OUTDIR_WEB)/.git
	git rev-parse HEAD > $(OUTDIR_WEB)/version.txt
	cd $(OUTDIR_WEB); \
		git remote set-url upstream $(UPSTREAM); \
		git add --all .; \
		git commit --amend --message 'Build site';\
		git push --force upstream gh-pages

.PHONY: deploy-box
deploy-box: $(OUTDIR)/command-the-command-line.box
	aws s3 cp $< s3://boxes.bocoup.com/

.PHONY: clean
clean:
	rm -rf $(OUTDIR)
