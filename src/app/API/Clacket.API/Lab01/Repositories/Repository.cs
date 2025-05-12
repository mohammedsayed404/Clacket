using Lab01.Data;
using Microsoft.EntityFrameworkCore;

namespace Lab01.Repositories;

public class Repository<TEntity, TKey> : IRepository<TEntity, TKey>
        where TEntity : EntityBase<TKey>
{
    private protected readonly DbContext _dbContext;
    private readonly DbSet<TEntity> _dbSet;

    public Repository(DbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<TEntity>();
    }

    ///need to modified again..
    public IEnumerable<TEntity> GetAll(bool cancellationTracking = true)
    {
        if (cancellationTracking)
            return _dbSet.AsNoTracking().ToList();

        return _dbSet.ToList();
    }


    public TEntity GetById(TKey key) => _dbSet.Find(key)!;
    public int Insert(TEntity entity)
    {
        _dbSet.Add(entity);
        return _dbContext.SaveChanges();
    }

    public int Remove(TEntity entity)
    {
        _dbSet.Remove(entity);
        return _dbContext.SaveChanges();
    }

    public int Update(TEntity entity)
    {
        _dbSet.Update(entity);
        return _dbContext.SaveChanges();
    }
}
