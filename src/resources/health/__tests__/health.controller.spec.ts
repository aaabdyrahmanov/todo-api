import HealthController from '../health.controller';

test('should return health status', (): void => {
 const response = HealthController.getStatus();

 expect(response.uptime).toBeGreaterThan(0);
 expect(response.message).toBe('OK');
 expect(response.timestamp).toBeDefined();

 expect(typeof response.uptime).toBe('number');
 expect(typeof response.message).toBe('string');
 expect(typeof response.timestamp).toBe('object');
});
