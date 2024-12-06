def call (body) {

    def settings = [:]
    body.resolveStrategy = Closure.DELEGATE_FIRST
    body.delegate = settings
    body()

    container('node') {
                    sh '''
                    yarn install
                    yarn test
                    '''
                }
}