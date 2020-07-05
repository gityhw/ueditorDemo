package com.ueditor.test.util;

import java.util.Random;

/**
 * 随机数工具类
 * @author Administrator
 *
 */
public final class RandomUtils {
	/**
	 * 获取指定位数的随机数
	 * @param num
	 * @return
	 */
	public static String getRandom(int num){
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for(int i = 0;i < num; i++){
			sb.append(String.valueOf(random.nextInt(10)));
		}
		return sb.toString();
	}
}
