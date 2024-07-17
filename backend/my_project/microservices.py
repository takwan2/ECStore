from aws_cdk import (
    aws_dynamodb as dynamodb,
    aws_lambda as _lambda
)
from constructs import Construct
import os

class MicroservicesProps:
    def __init__(self, product_table: dynamodb.ITable):
        self.product_table = product_table

class Microservices(Construct):

    def __init__(self, scope: Construct, id: str, props: MicroservicesProps):
        super().__init__(scope, id)

        self.product_microservice = self.create_product_function(props.product_table)

    def create_product_function(self, product_table: dynamodb.ITable) -> _lambda.Function:
        product_function = _lambda.Function(self, 'productLambdaFunction',
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler='product_lambda.lambda_handler',
            code=_lambda.Code.from_asset(os.path.join(os.path.dirname(__file__), '../src/product')),
            environment={
                'PRIMARY_KEY': 'id',
                'DYNAMODB_TABLE_NAME': product_table.table_name
            }
        )

        product_table.grant_read_write_data(product_function)
        return product_function