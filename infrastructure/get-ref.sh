if grep -q "tags/v" <<< $GITHUB_REF; then
    VERSION=${GITHUB_REF#refs/tags/v} >> $GITHUB_ENV
    echo GITHUB_REF is version: w$VERSION
    echo "::set-output name=VERSION::${VERSION}"
elif grep -q "tags" <<< $GITHUB_REF; then
    TAG=${GITHUB_REF#refs/tags/} >> $GITHUB_ENV
    echo GITHUB_REF is tag: $TAG
    echo "::set-output name=TAG::${TAG}"
else
    BRANCH=${GITHUB_REF#refs/heads/} >> $GITHUB_ENV
    echo "::set-output name=BRANCH::${BRANCH}"
    echo GITHUB_REF is branch: $BRANCH
fi