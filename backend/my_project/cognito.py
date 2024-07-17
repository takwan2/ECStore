from aws_cdk import aws_cognito as cognito
from constructs import Construct

class Cognito(Construct):

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        self.user_pool = cognito.UserPool(self, "MyUserPool",
            user_pool_name="MyUserPool",
            self_sign_up_enabled=True,
            sign_in_aliases=cognito.SignInAliases(
                username=True,
                email=True
            ),
            auto_verify=cognito.AutoVerifiedAttrs(email=True),
            password_policy=cognito.PasswordPolicy(
                min_length=8,
                require_lowercase=True,
                require_uppercase=True,
                require_digits=True,
                require_symbols=True,
            ),
            account_recovery=cognito.AccountRecovery.EMAIL_ONLY
        )

        self.user_pool_client = cognito.UserPoolClient(self, "UserPoolClient",
            user_pool=self.user_pool,
            generate_secret=False
        )

        self.admin_group = cognito.CfnUserPoolGroup(self, "AdminGroup",
            user_pool_id=self.user_pool.user_pool_id,
            group_name="Admin"
        )
