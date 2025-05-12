namespace Lab01.Helper;

public static class DIHelper
{
    private static IServiceProvider _serviceProvider;

    public static void SetServiceProvider(IServiceProvider serviceProvider)
      =>  _serviceProvider = serviceProvider;

    public static IServiceProvider GetServiceProvider() => _serviceProvider;
}
