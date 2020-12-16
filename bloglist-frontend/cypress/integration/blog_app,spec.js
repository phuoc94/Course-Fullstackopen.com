describe('Blog ', function () {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        const user2 = {
            name: 'Matti Luukkainen2',
            username: 'mluukkai2',
            password: 'salainen2'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.request('POST', 'http://localhost:3001/api/users/', user2)

        cy.visit('http://localhost:3000')
    })





    describe('Login',function() {
        it('front page can be opened', function () {
            cy.contains('blogs')
        })
        it('Login form is shown', function() {
            cy.contains('login').click()
            cy.contains('username')
            cy.contains('password')
        })

        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('cantlogin')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.get('.error').contains('wrong username or password')
        })
    })

    describe('Blog',function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        describe('create blog', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'title',  author: 'author', url: 'url' })
            })

            it('create blog', function() {
                cy.contains('Create new blog').click()
                cy.contains('create')
                // fill blog form
                cy.get('#title').type('titleui')
                cy.get('#author').type('authorui')
                cy.get('#url').type('urlui')
                cy.get('#create-button').click()
                cy.get('.success').contains('a new blog titleui by authorui added')
                cy.get('.blog').contains('titleui authorui')
            })

            it('like', function() {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('remove blog', function() {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('.success').contains('blog title removed')
                cy.get('.blog').should('not.exist')
            })

            it('remove with wrong defrence user', function() {
                cy.contains('Logout').click()
                cy.login({ username: 'mluukkai2', password: 'salainen2' })
                cy.contains('view').click()
                cy.contains('remove').should('not.exist')
            })

        })

        describe('blogs', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'title',  author: 'author', url: 'url' })
                cy.createBlog({ title: 'title1',  author: 'author1', url: 'url1' })
                cy.createBlog({ title: 'title2',  author: 'author2', url: 'url2' })
                cy.createBlog({ title: 'title3',  author: 'author3', url: 'url3' })
            })
            it('check blogs order', function() {
              // like second blog
              cy.contains('title2 author2')
                .contains('view').click()
              cy.contains('like').click()
              // refres site
              cy.visit('http://localhost:3000')
              // is first blogs liked
              cy.contains('view').click()
              cy.contains('likes 1')
            })


        })



    })

})