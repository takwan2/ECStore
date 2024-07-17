from aws_cdk import (
    aws_apigateway as apigateway,
    aws_lambda as _lambda,
    aws_iam as iam
)
from constructs import Construct

class ApiGatewayProps:
    def __init__(self, product_microservice: _lambda.IFunction, cognito):
        self.product_microservice = product_microservice
        self.cognito = cognito

class ApiGateway(Construct):

    def __init__(self, scope: Construct, id: str, props: ApiGatewayProps):
        super().__init__(scope, id)

        self.create_product_api(props.product_microservice, props.cognito)

    def create_product_api(self, product_microservice: _lambda.IFunction, cognito):

        apigw = apigateway.LambdaRestApi(self, 'productApi',
            rest_api_name='Product Service',
            handler=product_microservice,
            proxy=False
        )

        # authorizer = apigateway.CognitoUserPoolsAuthorizer(self, "CognitoAuthorizer",
        #     cognito_user_pools=[cognito.user_pool]
        # )

        product = apigw.root.add_resource('product')
        product.add_method('GET')
        product.add_method('POST')

        single_product = product.add_resource('{id}')
        single_product.add_method('GET')
        single_product.add_method('DELETE')
        single_product.add_method('PUT')
