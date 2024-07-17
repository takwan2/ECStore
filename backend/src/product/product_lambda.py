import json
import os
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import uuid
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
ddb_client = boto3.client('dynamodb')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    print(f"request: {json.dumps(event, indent=2)}")

    http_method = event['httpMethod']
    path = event['path']
    path_parameters = event.get('pathParameters')
    query_string_parameters = event.get('queryStringParameters')

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    try:
        if http_method == 'GET':
            if query_string_parameters:
                body = get_products_by_category(event)
            elif path_parameters:
                body = get_product(path_parameters['id'])
            else:
                body = get_all_products()
        elif http_method == 'POST':
            body = create_product(event)
        elif http_method == 'DELETE':
            body = delete_product(path_parameters['id'])
        elif http_method == 'PUT':
            body = update_product(event)
        else:
            raise ValueError(f"Unsupported route: {http_method}")

        print(body)
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'message': f'Successfully finished operation: {http_method}',
                'body': body
            }, cls=DecimalEncoder)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'message': 'Failed to perform operation.',
                'errorMsg': str(e),
                'errorStack': str(e)
            }, cls=DecimalEncoder)
        }

def get_product(product_id):
    print("getProduct")
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])
    try:
        response = table.get_item(Key={'id': product_id})
        return response.get('Item', {})
    except ClientError as e:
        print(e)
        raise

def get_all_products():
    print("getAllProducts")
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])
    try:
        response = table.scan()
        return response.get('Items', [])
    except ClientError as e:
        print(e)
        raise

def create_product(event):
    print(f"createProduct function. event: {event}")
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])
    try:
        product_request = json.loads(event['body'])
        product_id = str(uuid.uuid4())
        product_request['id'] = product_id

        response = table.put_item(Item=product_request)
        return response
    except ClientError as e:
        print(e)
        raise

def delete_product(product_id):
    print(f"deleteProduct function. productId: {product_id}")
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])
    try:
        response = table.delete_item(Key={'id': product_id})
        return response
    except ClientError as e:
        print(e)
        raise

def update_product(event):
    print(f"updateProduct function. event: {event}")
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])
    try:
        request_body = json.loads(event['body'])
        obj_keys = list(request_body.keys())
        
        if 'id' in obj_keys:
            obj_keys.remove('id')
        
        update_expression = "SET " + ", ".join(f"#{key} = :{key}" for key in obj_keys)
        expression_attribute_names = {f"#{key}": key for key in obj_keys}
        
        expression_attribute_values = {}
        for key, value in request_body.items():
            if key == 'id':
                continue
            if isinstance(value, str):
                expression_attribute_values[f":{key}"] = {'S': value}
            elif isinstance(value, int):
                expression_attribute_values[f":{key}"] = {'N': str(value)}

        params = {
            'TableName': os.environ['DYNAMODB_TABLE_NAME'],
            'Key': {'id': {'S': event['pathParameters']['id']}},
            'UpdateExpression': update_expression,
            'ExpressionAttributeNames': expression_attribute_names,
            'ExpressionAttributeValues': expression_attribute_values,
            'ReturnValues': "UPDATED_NEW"
        }

        response = ddb_client.update_item(**params)
        return response
    except ClientError as e:
        print(e)
        raise

def get_products_by_category(event):
    print("getProductsByCategory")
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])
    try:
        category = event['queryStringParameters']['category']

        response = table.scan(
            FilterExpression=Attr('category').contains(category)
        )
        
        return response.get('Items', [])
    except ClientError as e:
        print(e)
        raise
