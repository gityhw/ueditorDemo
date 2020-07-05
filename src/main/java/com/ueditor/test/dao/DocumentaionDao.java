package com.ueditor.test.dao;

import java.util.List;

import com.ueditor.test.pojo.Documentation;

public interface DocumentaionDao {
    int deleteByPrimaryKey(String id);

    int insert(Documentation record);

    int insertSelective(Documentation record);

    Documentation selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Documentation record);

    int updateByPrimaryKey(Documentation record);
    
    Documentation findByName(String name);
    
    List<Documentation> findAll();

	Documentation findDocByProductAndPage(String product, String page);
}