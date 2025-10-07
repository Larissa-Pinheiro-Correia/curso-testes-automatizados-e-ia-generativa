describe('GET /customers', () => {
  const baseUrl = Cypress.env('apiUrl')

  it('retorna lista de clientes com status 200 e paginação padrão', () => {
    cy.request('GET', `${baseUrl}/customers?page=1&limit=10`).then(({ status, body }) => {
      expect(status).to.eq(200)
      const { customers, pageInfo } = body
      expect(customers).to.be.an('array')
      expect(pageInfo).to.have.property('currentPage', 1)
      expect(pageInfo).to.have.property('totalCustomers')
      expect(pageInfo).to.have.property('totalPages')
    })
  })

  it('retorna clientes filtrados por tamanho e indústria', () => {
    cy.request('GET', `${baseUrl}/customers?page=2&limit=5&size=Medium&industry=Technology`).then(({ status, body }) => {
      expect(status).to.eq(200)
      const { customers, pageInfo } = body
      expect(customers).to.be.an('array')
      customers.forEach(({ size, industry }) => {
        expect(size).to.eq('Medium')
        expect(industry).to.eq('Technology')
      })
      expect(pageInfo.currentPage).to.eq(2)
    })
  })

  it('retorna erro 400 quando o parâmetro page é inválido', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/customers?page=-1`,
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400)
    })
  })

  it('retorna erro 400 quando o parâmetro size é inválido', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/customers?size=Gigantic`,
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400)
    })
  })

  it('retorna erro 400 quando o parâmetro industry é inválido', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/customers?industry=Food`,
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400)
    })
  })
})
