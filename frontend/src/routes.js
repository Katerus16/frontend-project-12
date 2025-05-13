const routes = {
  getChannel: () => '/api/v1/channels',
  getChannelById: (id) => `/api/v1/channels/${id}`,
  getAuthUser: () => '/api/v1/login',
  getNewAuthUser: () => '/api/v1/signup',
  getMessages: () => '/api/v1/messages',
};

export default routes;
