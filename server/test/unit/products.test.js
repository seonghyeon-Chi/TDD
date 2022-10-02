const productController = require('../../controller/products')
const productModel = require('../../model/Product')
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json')

productModel.create = jest.fn();
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  })
  it("should have a createProduct function", () => {
    // ProductController에 createProduct가 함수인지 파악함
    expect(typeof productController.createProduct).toBe("function");
  })
  it("should call ProductModel.create", () => {
    productController.createProduct(req, res, next);
    // productController의 createProduct가 실행될때
    // productModel의 create가 호출되는지 확인
    // DB에 직접적인 영향을 받으면 안되기 때문에
    // mock함수인 jest.fn()을 확인한다.
    expect(productModel.create).toBeCalledWith(newProduct);
  })
  // data를 성공적으로 create시 201
  it("should return 201 respone code", () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it("should return json body in response", () => {
    productModel.create.mockReturnValue(newProduct);
    productController.createProduct(req, res, next);
    // res의 json data가 newProduct와 일치하는지 판단 여부
    expect(res._getJSONData()).toStrictEqual(newProduct)
  })
})
