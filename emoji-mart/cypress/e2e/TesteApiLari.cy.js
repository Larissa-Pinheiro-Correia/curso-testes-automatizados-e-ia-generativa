describe("API /customers", () => {
  const baseUrl = "http://localhost:3001/customers";

  it("deve retornar a lista padrão de clientes (page=1, limit=10)", () => {
    cy.request(baseUrl).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("customers");
      expect(res.body.customers).to.be.an("array");
      expect(res.body.customers.length).to.be.lte(10);
      expect(res.body.pageInfo.currentPage).to.eq(1);
    });
  });

  it("deve paginar corretamente (page=2, limit=5)", () => {
    cy.request(`${baseUrl}?page=2&limit=5`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.pageInfo.currentPage).to.eq(2);
      expect(res.body.customers.length).to.be.lte(5);
    });
  });

  it("deve filtrar por size e industry", () => {
    cy.request(`${baseUrl}?size=Medium&industry=Technology`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.customers).to.satisfy((customers) =>
        customers.every((c) => c.size === "Medium" && c.industry === "Technology")
      );
    });
  });

  it("deve retornar 400 para size inválido", () => {
    cy.request({
      url: `${baseUrl}?size=Invalid`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("error");
    });
  });

  it("deve retornar 400 para page negativa", () => {
    cy.request({
      url: `${baseUrl}?page=-1`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it("deve atribuir size dinamicamente conforme número de funcionários", () => {
    cy.request(baseUrl).then((res) => {
      res.body.customers.forEach((c) => {
        if (c.employees < 100) expect(c.size).to.eq("Small");
        if (c.employees >= 100 && c.employees < 1000) expect(c.size).to.eq("Medium");
        if (c.employees >= 1000 && c.employees < 10000) expect(c.size).to.eq("Enterprise");
        if (c.employees >= 10000 && c.employees < 50000) expect(c.size).to.eq("Large Enterprise");
        if (c.employees >= 50000) expect(c.size).to.eq("Very Large Enterprise");
      });
    });
  });
});
