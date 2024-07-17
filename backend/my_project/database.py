from aws_cdk import (
    aws_dynamodb as dynamodb,
    RemovalPolicy,
)
from constructs import Construct

class Database(Construct):

    def __init__(self, scope: Construct, id: str) -> None:
        super().__init__(scope, id)

        self.product_table = self.create_product_table()

    def create_product_table(self) -> dynamodb.Table:
        product_table = dynamodb.Table(self, 'product',
            partition_key=dynamodb.Attribute(
                name='id',
                type=dynamodb.AttributeType.STRING
            ),
            table_name='product',
            removal_policy=RemovalPolicy.DESTROY,
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST
        )
        return product_table