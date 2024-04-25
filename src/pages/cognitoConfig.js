import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-west-1_Q45CV3zJu',
    ClientId: '7g1j2ri8qrck6ekfkucalrgd9b',
};

export const CognitoDomain = 'https://flip-authenticate.auth.us-west-1.amazoncognito.com/';

export const yourAppDomain = 'https://061728fc7d9448e79a59e5dc81ee41e5.vfs.cloud9.us-west-1.amazonaws.com/Dashboard';

const UserPool = new CognitoUserPool(poolData);

export default UserPool;