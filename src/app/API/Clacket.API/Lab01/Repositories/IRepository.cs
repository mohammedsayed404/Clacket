using Lab01.Data;

namespace Lab01.Repositories;



public interface IRepository<TEntity, TKey> where TEntity : EntityBase<TKey>
{

    IEnumerable<TEntity> GetAll(bool cancellationTracking = true);

    TEntity GetById(TKey key);
    int Insert(TEntity entity);
    int Remove(TEntity entity);
    int Update(TEntity entity);


}