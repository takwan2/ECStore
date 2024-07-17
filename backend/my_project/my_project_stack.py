from aws_cdk import (
    Stack,
    StackProps,
    aws_dynamodb as dynamodb,
    aws_lambda as _lambda,
    aws_sqs as sqs,
    aws_events as events,
    aws_events_targets as targets,
    aws_iam as iam,
)
from constructs import Construct

from .apigateway import ApiGateway, ApiGatewayProps
from .database import Database
from .microservices import Microservices, MicroservicesProps
from .cognito import Cognito

class MyProjectStack(Stack):
      def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cognito = Cognito(self, "Cognito")

        database = Database(self, 'Database')

        microservices_props = MicroservicesProps(
            product_table=database.product_table,
        )

        microservices = Microservices(self, 'Microservices', microservices_props)

        apigateway_props = ApiGatewayProps(
            product_microservice=microservices.product_microservice,
            cognito=cognito
        )

        apigateway = ApiGateway(self, 'ApiGateway', apigateway_props)
        