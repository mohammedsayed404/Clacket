namespace Lab01.Data;

public abstract class EntityBase<TKey>
{
    public TKey Id { get; set; }

}